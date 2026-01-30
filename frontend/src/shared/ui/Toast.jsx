import "@/shared/styles/ui.css";
import { useUI } from "./uiStore";

export default function Toast() {
  const { _toast } = useUI();

  if (!_toast) return null;

  return (
    <div className="toast-wrapper">
      <div className="toast">
        {_toast}
      </div>
    </div>
  );
}
