import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fileToJpegDataUrl } from "@/lib/image-upload";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {value ? <img src={value} alt="" className="mb-2 h-28 w-full rounded-md object-cover" /> : null}
      <Input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onChange(await fileToJpegDataUrl(file));
        }}
      />
      <Input className="mt-2" value={value.startsWith("data:") ? "" : value} placeholder="یا آدرس تصویر" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
