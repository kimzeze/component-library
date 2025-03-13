/**
 * Avatar 컴포넌트
 *
 * 사용자 프로필 이미지를 표시하는 컴포넌트입니다.
 * 다양한 크기와 모양 옵션을 제공합니다.
 *
 * @example
 * // 기본 사용법 (이미지)
 * <Avatar src="/path/to/image.jpg" alt="사용자 이름" />
 *
 * // 크기 조정
 * <Avatar src="/path/to/image.jpg" size="lg" />
 *
 * // 모양 변경
 * <Avatar src="/path/to/image.jpg" shape="square" />
 *
 * // 테두리 추가
 * <Avatar src="/path/to/image.jpg" border />
 *
 * // border-radius 직접 조절
 * <Avatar src="/path/to/image.jpg" borderRadius="4px" />
 */
import { HTMLAttributes, forwardRef } from "react";

import Image from "next/image";

import cn from "@/lib/utils/cn";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 이미지 URL */
  src?: string;
  /** 대체 텍스트 (접근성) */
  alt?: string;
  /** 아바타 크기 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 아바타 모양 */
  shape?: "circle" | "square";
  /** 테두리 적용 여부 */
  border?: boolean;
  /** border-radius 직접 설정 (shape보다 우선 적용) */
  borderRadius?: string;
  /** 배경 색상 */
  bgColor?: string;
  /** 사용자 정의 CSS 클래스 */
  className?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      size = "md",
      shape = "circle",
      border = true,
      borderRadius,
      bgColor = "bg-gray-100",
      className,
      ...props
    },
    ref,
  ) => {
    // 크기에 따른 스타일 설정
    const sizeStyles = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    };

    // 모양에 따른 스타일 설정
    const shapeStyles = {
      circle: "rounded-full",
      square: "rounded-3xs",
    };

    // 이미지 로딩 실패 시 처리
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // 이미지 로드 실패 시 처리할 수 있는 로직
      console.error("Avatar image failed to load:", e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center overflow-hidden",
          sizeStyles[size],
          !borderRadius && shapeStyles[shape],
          border && "border border-gray-100",
          className,
        )}
        style={{
          ...(borderRadius ? { borderRadius } : {}),
          ...props.style,
        }}
        {...props}
      >
        {src ? (
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt || ""}
              fill
              sizes="100%"
              className="object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className={cn("flex h-full w-full items-center justify-center", bgColor)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -2 28 28"
              className="h-4/5 w-4/5 text-gray-400"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
