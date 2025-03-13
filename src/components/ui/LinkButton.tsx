/**
 * LinkButton 컴포넌트
 *
 * Button 컴포넌트와 동일한 스타일링을 제공하는 라우터 이동용 링크 컴포넌트입니다.
 * 서버 컴포넌트에서도 사용 가능합니다.
 *
 * @example
 * // 기본 사용법
 * <LinkButton href="/login">로그인 페이지로 이동</LinkButton>
 *
 * // 검은색 링크 버튼
 * <LinkButton href="/signup" color="black">회원가입 페이지로 이동</LinkButton>
 *
 * // 전체 너비 링크 버튼
 * <LinkButton href="/dashboard" fullWidth>대시보드로 이동</LinkButton>
 *
 * // 커스텀 크기 링크 버튼
 * <LinkButton href="/profile" width={200} height={50}>프로필로 이동</LinkButton>
 */
import { AnchorHTMLAttributes } from "react";

import Link from "next/link";

import cn from "@/lib/utils/cn";

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** 이동할 경로 */
  href: string;
  /** 버튼 색상 - "white" 또는 "black" */
  color?: "white" | "black";
  /** 버튼을 부모 요소의 전체 너비로 확장 */
  fullWidth?: boolean;
  /** 버튼의 너비 (픽셀 또는 CSS 값) */
  width?: string | number;
  /** 버튼의 높이 (픽셀 또는 CSS 값) */
  height?: string | number;
  /** 비활성화 상태 */
  disabled?: boolean;
}

const LinkButton = ({
  children,
  className,
  color = "white",
  fullWidth = false,
  width,
  height,
  href,
  disabled = false,
  ...props
}: LinkButtonProps) => {
  const colorVariants = {
    white: "bg-white border-gray-100 hover:bg-gray-50",
    black: "bg-gray-900 border-gray-900 text-white hover:bg-gray-800",
  };

  const styles = {
    ...(width && !fullWidth ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    ...props.style,
  };

  const buttonClasses = cn(
    "flex items-center justify-center rounded-2xs border text-center text-sm",
    colorVariants[color],
    fullWidth ? "w-full" : "",
    height ? "" : "px-xl py-2xs",
    disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : "",
    className,
  );

  if (disabled) {
    return (
      <span className={buttonClasses} style={styles}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={buttonClasses} style={styles} {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
