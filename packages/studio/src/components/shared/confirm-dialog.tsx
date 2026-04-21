import { X } from "lucide-react";
import { useEffect } from "react";

export function ConfirmDialog({
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDanger = true,
  isOpen,
  onConfirm,
  onCancel,
}: {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isOpen: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="twick-modal-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="twick-modal-content">
        <div className="twick-modal-header">
          <div className="twick-modal-title">{title}</div>
          <button type="button" className="btn-ghost twick-modal-close" onClick={onCancel}>
            <X className="icon-sm" />
          </button>
        </div>

        {description ? <div className="twick-modal-description">{description}</div> : null}

        <div className="twick-modal-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={isDanger ? "btn-danger" : "btn-primary"}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

