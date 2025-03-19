import { BaseModal } from "./BaseModal";
import { ButtonStyle } from "./BaseModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: ButtonStyle;
  cancelButtonStyle?: ButtonStyle;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "확인",
  confirmText = "확인",
  cancelText = "취소",
  confirmButtonStyle,
  cancelButtonStyle,
}: ConfirmModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      positiveButton={{
        text: confirmText,
        onClick: () => {
          onConfirm();
          onClose();
        },
        style: confirmButtonStyle,
      }}
      negativeButton={{
        text: cancelText,
        onClick: onClose,
        style: cancelButtonStyle,
      }}
    >
      <p className="text-center text-gray-600">{message}</p>
    </BaseModal>
  );
}
