"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Portal } from "./Portal";
import cn from "@/lib/utils/cn";
import { allowScroll, preventScroll } from "@/lib/utils/scroll";

export interface ButtonStyle {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  activeBgColor?: string;
  border?: boolean;
  borderColor?: string;
}

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full" | number;
  title?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  positiveButton?: {
    text: string;
    onClick: () => void;
    className?: string;
    style?: ButtonStyle;
  };
  negativeButton?: {
    text: string;
    onClick: () => void;
    className?: string;
    style?: ButtonStyle;
  };
}

export function BaseModal({
  isOpen,
  onClose,
  children,
  size = "md",
  title,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  positiveButton,
  negativeButton,
}: BaseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const scrollPositionRef = useRef<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // 닫기 핸들러 수정
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // 애니메이션 시간과 맞춤
  }, [onClose]);

  // ESC 키 핸들러 수정
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        handleClose();
      }
    },
    [closeOnEsc, handleClose],
  );

  // 오버레이 클릭 핸들러 수정
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      // 스크롤 방지
      scrollPositionRef.current = preventScroll();

      // 키보드 이벤트 리스너
      if (closeOnEsc) {
        document.addEventListener("keydown", handleKeyDown);
      }

      // 모달 열릴 때 포커스
      modalRef.current?.focus();
    }

    return () => {
      if (isOpen) {
        allowScroll(scrollPositionRef.current);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, closeOnEsc, handleKeyDown]);

  if (!isOpen && !isClosing) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    full: "max-w-[90vw]",
  };

  const getButtonStyles = (style?: ButtonStyle) => {
    if (!style) return "";

    return cn(
      style.bgColor || "",
      style.textColor || "",
      style.hoverBgColor ? `hover:${style.hoverBgColor}` : "",
      style.activeBgColor ? `active:${style.activeBgColor}` : "",
      style.border ? "border" : "",
      style.borderColor || "",
    );
  };

  return (
    <Portal>
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4",
          isClosing ? "animate-fadeOut" : "animate-fadeIn",
        )}
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          tabIndex={-1}
          className={cn(
            "relative w-full rounded-lg bg-white shadow-xl",
            typeof size === "number" ? `max-w-[${size}px]` : sizeClasses[size],
            isClosing ? "animate-scaleDown" : "animate-scaleUp",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="px-md pb-3xs pt-md">
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            </div>
          )}

          <div className={cn("p-md text-sm", title && "pt-3xs")}>
            {children}

            {(positiveButton || negativeButton) && (
              <div className="flex justify-end gap-2 pt-md">
                {negativeButton && (
                  <button
                    onClick={negativeButton.onClick}
                    className={cn(
                      "rounded-2xs px-xl py-3xs transition-colors duration-200 ease-in-out",
                      !negativeButton.style && "text-gray-600 hover:bg-gray-100 active:bg-gray-50",
                      getButtonStyles(negativeButton.style),
                      negativeButton.className,
                    )}
                  >
                    {negativeButton.text}
                  </button>
                )}
                {positiveButton && (
                  <button
                    onClick={positiveButton.onClick}
                    className={cn(
                      "rounded-2xs px-xl py-3xs transition-colors duration-200 ease-in-out",
                      !positiveButton.style &&
                        "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600",
                      getButtonStyles(positiveButton.style),
                      positiveButton.className,
                    )}
                  >
                    {positiveButton.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
