import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdminData } from "@/lib/admin-query";
import { reorderSection, saveSection } from "@/lib/functions/admin";
import type { HomepageSection } from "@/lib/types";

export const Route = createFileRoute("/admin/sections")({ component: SectionsAdmin });

const LABELS: Record<string, string> = {
  hero: "سربرگ",
  featured: "محصولات پیشنهادی",
  categories: "دسته‌ها",
  about: "درباره",
  promo: "بنر تبلیغاتی",
  contact: "تماس",
  instagram: "اینستاگرام",
};

function SectionsAdmin() {
  const { data, isPending } = useAdminData();
  const qc = useQueryClient();
  const [drafts, setDrafts] = useState<Record<number, HomepageSection>>({});

  const save = useMutation({
    mutationFn: (section: HomepageSection) =>
      saveSection({
        data: {
          id: section.id,
          enabled: section.enabled,
          title: section.title,
          description: section.description,
          imageUrl: section.imageUrl,
          buttonText: section.buttonText,
          buttonLink: section.buttonLink,
          extra: section.extra,
        },
      }),
    onSuccess: async () => {
      toast.success("بخش ذخیره شد");
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "خطا"),
  });

  if (isPending || !data) return <p className="text-sm text-muted">در حال بارگذاری…</p>;

  function current(section: HomepageSection): HomepageSection {
    return drafts[section.id] ?? section;
  }

  function patch(section: HomepageSection, partial: Partial<HomepageSection>) {
    const next = { ...current(section), ...partial };
    setDrafts((d) => ({ ...d, [section.id]: next }));
  }

  async function move(id: number, direction: "up" | "down") {
    await reorderSection({ data: { id, direction } });
    await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">بخش‌های صفحه اصلی</h1>
      <p className="mt-1 text-sm text-muted">هر بخش را خاموش کنید، متن و تصویرش را عوض کنید یا جابه‌جا کنید.</p>
      <div className="mt-4 space-y-4">
        {data.sections.map((section) => {
          const s = current(section);
          return (
            <article key={section.id} className="rounded-lg bg-paper p-4 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{LABELS[section.key] || section.key}</p>
                <div className="flex items-center gap-1">
                  <button type="button" className="size-9" onClick={() => move(section.id, "up")}>
                    <ChevronUp className="mx-auto size-4" />
                  </button>
                  <button type="button" className="size-9" onClick={() => move(section.id, "down")}>
                    <ChevronDown className="mx-auto size-4" />
                  </button>
                  <Switch checked={s.enabled} onCheckedChange={(enabled) => patch(section, { enabled })} />
                </div>
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <Label>عنوان</Label>
                  <Input value={s.title} onChange={(e) => patch(section, { title: e.target.value })} />
                </div>
                <div>
                  <Label>توضیح</Label>
                  <Textarea value={s.description} onChange={(e) => patch(section, { description: e.target.value })} />
                </div>
                {section.key === "hero" || section.key === "about" || section.key === "promo" || section.key === "instagram" ? (
                  <ImageField label="تصویر" value={s.imageUrl} onChange={(imageUrl) => patch(section, { imageUrl })} />
                ) : null}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>متن دکمه</Label>
                    <Input value={s.buttonText} onChange={(e) => patch(section, { buttonText: e.target.value })} />
                  </div>
                  <div>
                    <Label>لینک دکمه</Label>
                    <Input dir="ltr" value={s.buttonLink} onChange={(e) => patch(section, { buttonLink: e.target.value })} />
                  </div>
                </div>
                {section.key === "hero" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>دکمه دوم</Label>
                      <Input
                        value={s.extra.secondaryText ?? ""}
                        onChange={(e) => patch(section, { extra: { ...s.extra, secondaryText: e.target.value } })}
                      />
                    </div>
                    <div>
                      <Label>لینک دوم</Label>
                      <Input
                        dir="ltr"
                        value={s.extra.secondaryLink ?? ""}
                        onChange={(e) => patch(section, { extra: { ...s.extra, secondaryLink: e.target.value } })}
                      />
                    </div>
                  </div>
                ) : null}
                <Button size="sm" onClick={() => save.mutate(s)} disabled={save.isPending}>
                  ذخیره این بخش
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
