import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdminData } from "@/lib/admin-query";
import { changeAdminPassword, saveSettings } from "@/lib/functions/admin";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/types";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

function SettingsAdmin() {
  const { data, isPending } = useAdminData();
  const qc = useQueryClient();
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");

  useEffect(() => {
    if (data?.settings) setForm(data.settings);
  }, [data]);

  const save = useMutation({
    mutationFn: () => saveSettings({ data: form }),
    onSuccess: async () => {
      toast.success("تنظیمات ذخیره شد");
      await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "خطا"),
  });

  const password = useMutation({
    mutationFn: () => changeAdminPassword({ data: { currentPassword, nextPassword } }),
    onSuccess: () => {
      toast.success("رمز عوض شد");
      setCurrentPassword("");
      setNextPassword("");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "خطا"),
  });

  if (isPending) return <p className="text-sm text-muted">در حال بارگذاری…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">تنظیمات سایت</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <div>
          <Label>نام سایت</Label>
          <Input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
        </div>
        <div>
          <Label>شعار</Label>
          <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </div>
        <div>
          <Label>شماره تماس</Label>
          <Input dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <Label>آیدی اینستاگرام</Label>
          <Input dir="ltr" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
        </div>
        <div>
          <Label>متن درباره ما</Label>
          <Textarea value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })} />
        </div>
        <div>
          <Label>یادداشت پایین سایت</Label>
          <Input value={form.footerNote} onChange={(e) => setForm({ ...form, footerNote: e.target.value })} />
        </div>
        <div className="rounded-lg border border-line bg-cream p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">بستن موقت سفارش</p>
              <p className="text-xs text-muted">پنجره اطلاع‌رسانی برای مشتری نمایش داده می‌شود.</p>
            </div>
            <Switch checked={form.orderClosed} onCheckedChange={(orderClosed) => setForm({ ...form, orderClosed })} />
          </div>
          <div className="mt-3">
            <Label>عنوان پنجره</Label>
            <Input value={form.orderClosedTitle} onChange={(e) => setForm({ ...form, orderClosedTitle: e.target.value })} />
          </div>
          <div className="mt-3">
            <Label>پیام (از {"{date}"} برای تاریخ استفاده کنید)</Label>
            <Textarea value={form.orderClosedMessage} onChange={(e) => setForm({ ...form, orderClosedMessage: e.target.value })} />
          </div>
          <div className="mt-3">
            <Label>تاریخ بازگشایی</Label>
            <Input type="date" dir="ltr" value={form.orderReopenDate} onChange={(e) => setForm({ ...form, orderReopenDate: e.target.value })} />
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={save.isPending}>
          ذخیره تنظیمات
        </Button>
      </form>

      <form
        className="space-y-3 rounded-lg bg-paper p-4 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          password.mutate();
        }}
      >
        <h2 className="font-medium">تغییر رمز مدیریت</h2>
        <div>
          <Label>رمز فعلی</Label>
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <Label>رمز جدید</Label>
          <Input type="password" value={nextPassword} onChange={(e) => setNextPassword(e.target.value)} />
        </div>
        <Button type="submit" variant="outline" disabled={password.isPending}>
          به‌روزرسانی رمز
        </Button>
      </form>
    </div>
  );
}
