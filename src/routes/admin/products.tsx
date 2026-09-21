import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdminData } from "@/lib/admin-query";
import { deleteProduct, reorderProduct, saveProduct } from "@/lib/functions/admin";
import { formatToman, toEnDigits } from "@/lib/persian";
import { queryClient } from "@/lib/query";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/admin/products")({ component: ProductsAdmin });

type FormState = {
  id?: number;
  name: string;
  description: string;
  price: string;
  specialPrice: string;
  imageUrl: string;
  categoryId: string;
  available: boolean;
  featured: boolean;
  visible: boolean;
  tags: string;
  orderingNotes: string;
};

const emptyForm = (): FormState => ({
  name: "",
  description: "",
  price: "",
  specialPrice: "",
  imageUrl: "",
  categoryId: "",
  available: true,
  featured: false,
  visible: true,
  tags: "",
  orderingNotes: "",
});

function fromProduct(p: Product): FormState {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: String(p.price),
    specialPrice: p.specialPrice ? String(p.specialPrice) : "",
    imageUrl: p.imageUrl,
    categoryId: p.categoryId ? String(p.categoryId) : "",
    available: p.available,
    featured: p.featured,
    visible: p.visible,
    tags: p.tags,
    orderingNotes: p.orderingNotes,
  };
}

function ProductsAdmin() {
  const { data, isPending } = useAdminData();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);

  const save = useMutation({
    mutationFn: () => {
      if (!form) throw new Error("form");
      return saveProduct({
        data: {
          id: form.id,
          name: form.name,
          description: form.description,
          price: Number(toEnDigits(form.price)) || 0,
          specialPrice: form.specialPrice ? Number(toEnDigits(form.specialPrice)) : null,
          imageUrl: form.imageUrl,
          extraImages: [],
          categoryId: form.categoryId ? Number(form.categoryId) : null,
          available: form.available,
          featured: form.featured,
          visible: form.visible,
          tags: form.tags,
          orderingNotes: form.orderingNotes,
        },
      });
    },
    onSuccess: async () => {
      toast.success("محصول ذخیره شد");
      setForm(null);
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "خطا در ذخیره"),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteProduct({ data: { id } }),
    onSuccess: async () => {
      toast.success("حذف شد");
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
  });

  async function move(id: number, direction: "up" | "down") {
    await reorderProduct({ data: { id, direction } });
    await Promise.all([queryClient.invalidateQueries({ queryKey: ["admin-data"] }), queryClient.invalidateQueries({ queryKey: ["store"] })]);
  }

  if (isPending || !data) return <p className="text-sm text-muted">در حال بارگذاری…</p>;

  if (form) {
    return (
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{form.id ? "ویرایش محصول" : "محصول جدید"}</h1>
          <Button type="button" variant="ghost" onClick={() => setForm(null)}>
            انصراف
          </Button>
        </div>
        <div>
          <Label>نام</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <Label>توضیح فارسی</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>قیمت (تومان)</Label>
            <Input inputMode="numeric" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </div>
          <div>
            <Label>قیمت ویژه (اختیاری)</Label>
            <Input inputMode="numeric" value={form.specialPrice} onChange={(e) => setForm({ ...form, specialPrice: e.target.value })} />
          </div>
        </div>
        <ImageField label="تصویر اصلی" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
        <div>
          <Label>دسته</Label>
          <select
            className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">بدون دسته</option>
            {data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>برچسب‌ها</Label>
          <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="تولد، محبوب" />
        </div>
        <div>
          <Label>یادداشت سفارش</Label>
          <Input value={form.orderingNotes} onChange={(e) => setForm({ ...form, orderingNotes: e.target.value })} />
        </div>
        <ToggleRow label="موجود" checked={form.available} onChange={(available) => setForm({ ...form, available })} />
        <ToggleRow label="نمایش در سایت" checked={form.visible} onChange={(visible) => setForm({ ...form, visible })} />
        <ToggleRow label="پیشنهادی" checked={form.featured} onChange={(featured) => setForm({ ...form, featured })} />
        <Button className="w-full" type="submit" disabled={save.isPending}>
          ذخیره محصول
        </Button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">محصولات</h1>
        <Button size="sm" onClick={() => setForm(emptyForm())}>
          <Plus className="size-4" />
          جدید
        </Button>
      </div>
      <ul className="mt-4 space-y-2">
        {data.products.map((p) => (
          <li key={p.id} className="flex gap-3 rounded-lg bg-paper p-3 shadow-card">
            <img src={p.imageUrl} alt="" className="size-16 rounded-sm object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted">
                {formatToman(p.price)} {p.visible ? "" : "· مخفی"} {p.available ? "" : "· ناموجود"}
              </p>
            </div>
            <div className="flex flex-col">
              <button type="button" className="flex size-9 items-center justify-center" onClick={() => move(p.id, "up")} aria-label="بالا">
                <ChevronUp className="size-4" />
              </button>
              <button type="button" className="flex size-9 items-center justify-center" onClick={() => move(p.id, "down")} aria-label="پایین">
                <ChevronDown className="size-4" />
              </button>
            </div>
            <button type="button" className="flex size-11 items-center justify-center" onClick={() => setForm(fromProduct(p))} aria-label="ویرایش">
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-11 items-center justify-center text-accent-red"
              onClick={() => {
                if (confirm("این محصول حذف شود؟")) remove.mutate(p.id);
              }}
              aria-label="حذف"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex h-12 items-center justify-between rounded-md bg-cream px-3">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
