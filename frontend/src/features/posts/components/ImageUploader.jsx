import { useState } from "react";
import api from "@/shared/api/axios";
import { useUI } from "@/shared/ui/uiStore";

export default function ImageUploader({ onUploaded }) {
  const ui = useUI();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
  const MAX_MB = 5;

  const onPick = async (e) => {    // 이미지를 고르는 순간 presign 요청, 응답받음
    const f = e.target.files?.[0];
    if (!f) return;

    if (!ALLOWED.includes(f.type)) {
      ui.toast("이미지 파일만 가능합니다.");
      return;
    }

    if (f.size > MAX_MB * 1024 * 1024) {
      ui.toast("이미지는 5MB 이하만 가능합니다.");
      return;
    }

    try {
      setUploading(true);

      const { data } = await api.get("/images/presign", {   // presign 요청
        params: { contentType: f.type }
      });

      const res = await fetch(data.url, {    // S3로 직접 업로드
        method: "PUT",
        headers: { "Content-Type": f.type },
        body: f
      });

      if (!res.ok) throw new Error();

      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
      onUploaded(data.key);
    } catch {
      ui.toast("이미지 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="field">
      <span className="label">이미지</span>

      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onPick}
        disabled={uploading}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
            marginTop: 10,
            borderRadius: 8
          }}
        />
      )}
    </div>
  );
}
