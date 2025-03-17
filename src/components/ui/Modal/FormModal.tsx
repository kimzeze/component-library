"use client";

import { BaseModal } from "./BaseModal";
import { ButtonStyle } from "./BaseModal";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  submitText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
  isSubmitting?: boolean;
  submitButtonStyle?: ButtonStyle;
  cancelButtonStyle?: ButtonStyle;
}

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText = "저장",
  cancelText = "취소",
  size = "md",
  children,
  isSubmitting = false,
  submitButtonStyle,
  cancelButtonStyle,
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      positiveButton={{
        text: submitText,
        onClick: () => {
          const form = document.getElementById("form-modal") as HTMLFormElement;
          form.requestSubmit();
        },
        className: isSubmitting ? "opacity-50 cursor-not-allowed" : "",
        style: submitButtonStyle,
      }}
      negativeButton={{
        text: cancelText,
        onClick: onClose,
        className: isSubmitting ? "opacity-50 cursor-not-allowed" : "",
        style: cancelButtonStyle,
      }}
    >
      <form id="form-modal" onSubmit={handleSubmit}>
        {children}
      </form>
    </BaseModal>
  );
}
