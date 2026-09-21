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
import { deleteCategory, reorderCategory, saveCategory } from "@/lib/functions/admin";
import type { Category } from "@/lib/types";

export const Route = createFileRoute("/admin/categories")({ component: CategoriesAdmin });

type FormState = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

const emptyForm = (): FormState => ({ name: "", slug: "", description: "", imageUrl: "", visible: true });

function CategoriesAdmin() {
  const { data, isPending } = useAdminData();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);

  const save = useMutation({
    mutationFn: () => {
      if (!form) throw new Error("form");
      return saveCategory({
        data: {
          id: form.id,
          name: form.name,
          slug: form.slug || form.name,
          description: form.description,
          imageUrl: form.imageUrl,
          visible: form.visible,
        },
      });
    },
    onSuccess: async () => {
      toast.success("دسته ذخیره شد");
      setForm(null);
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "خطا"),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteCategory({ data: { id } }),
    onSuccess: async () => {
      toast.success("حذف شد");
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
  });

  async function move(id: number, direction: "up" | "down") {
    await reorderCategory({ data: { id, direction } });
    await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
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
          <h1 className="text-xl font-semibold">{form.id ? "ویرایش دسته" : "دسته جدید"}</h1>
          <Button type="button" variant="ghost" onClick={() => setForm(null)}>
            انصراف
          </Button>
        </div>
        <div>
          <Label>نام</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <Label>نامک انگلیسی (slug)</Label>
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="hot" dir="ltr" />
        </div>
        <div>
          <Label>توضیح</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <ImageField label="تصویر" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
        <div className="flex h-12 items-center justify-between rounded-md bg-cream px-3">
          <span className="text-sm">نمایش در سایت</span>
          <Switch checked={form.visible} onCheckedChange={(visible) => setForm({ ...form, visible })} />
        </div>
        <Button className="w-full" type="submit" disabled={save.isPending}>
          ذخیره دسته
        </Button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">دسته‌ها</h1>
        <Button size="sm" onClick={() => setForm(emptyForm())}>
          <Plus className="size-4" />
          جدید
        </Button>
      </div>
      <ul className="mt-4 space-y-2">
        {data.categories.map((c: Category) => (
          <li key={c.id} className="flex items-center gap-3 rounded-lg bg-paper p-3 shadow-card">
            <img src={c.imageUrl} alt="" className="size-14 rounded-sm object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted">
                {c.slug} {c.visible ? "" : "· مخفی"}
              </p>
            </div>
            <button type="button" className="size-9" onClick={() => move(c.id, "up")}>
              <ChevronUp className="mx-auto size-4" />
            </button>
            <button type="button" className="size-9" onClick={() => move(c.id, "down")}>
              <ChevronDown className="mx-auto size-4" />
            </button>
            <button type="button" className="size-11" onClick={() => setForm(c)}>
              <Pencil className="mx-auto size-4" />
            </button>
            <button
              type="button"
              className="size-11 text-accent-red"
              onClick={() => {
                if (confirm("این دسته حذف شود؟ محصولات بدون دسته می‌مانند.")) remove.mutate(c.id);
              }}
            >
              <Trash2 className="mx-auto size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
