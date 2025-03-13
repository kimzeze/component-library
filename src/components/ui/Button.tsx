/**
 * Button 컴포넌트
 *
 * 다양한 색상과 크기 옵션을 제공하는 기본 버튼 컴포넌트입니다.
 *
 * @example
 * // 기본 사용법
 * <Button>기본 버튼</Button>
 *
 * // 검은색 버튼
 * <Button color="black">검은색 버튼</Button>
 *
 * // 전체 너비 버튼
 * <Button fullWidth>전체 너비 버튼</Button>
 *
 * // 커스텀 크기 버튼
 * <Button width={200} height={50}>커스텀 크기 버튼</Button>
 *
 * // 비활성화 버튼
 * <Button disabled>비활성화 버튼</Button>
 */
import { ButtonHTMLAttributes, forwardRef } from "react";

import cn from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 색상 - "white" 또는 "black" */
  color?: "white" | "black";
  /** 버튼을 부모 요소의 전체 너비로 확장 */
  fullWidth?: boolean;
  /** 버튼의 너비 (픽셀 또는 CSS 값) */
  width?: string | number;
  /** 버튼의 높이 (픽셀 또는 CSS 값) */
  height?: string | number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, color = "white", fullWidth = false, width, height, ...props }, ref) => {
    const colorVariants = {
      white: "bg-white border-gray-100 disabled:hover:bg-white hover:bg-gray-50",
      black: "bg-gray-900 border-gray-900 text-white disabled:hover:bg-gray-900 hover:bg-gray-800",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-2xs border text-center text-sm disabled:cursor-not-allowed disabled:opacity-50",
          colorVariants[color],
          fullWidth ? "w-full" : "",
          height ? "" : "px-xl py-2xs",
          className,
        )}
        style={{
          ...(width && !fullWidth
            ? { width: typeof width === "number" ? `${width}px` : width }
            : {}),
          ...(height ? { height: typeof height === "number" ? `${height}px` : height } : {}),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
