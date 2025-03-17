import { BaseModal } from "./BaseModal";
import { ButtonStyle } from "./BaseModal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  confirmText?: string;
  buttonStyle?: ButtonStyle;
}

export function AlertModal({
  isOpen,
  onClose,
  message,
  title = "알림",
  confirmText = "확인",
  buttonStyle,
}: AlertModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      positiveButton={{
        text: confirmText,
        onClick: onClose,
        style: buttonStyle,
      }}
    >
      <p className="text-center text-gray-600">{message}</p>
    </BaseModal>
  );
}
