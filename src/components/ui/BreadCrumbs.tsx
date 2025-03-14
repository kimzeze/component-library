/**
 * BreadCrumbs 컴포넌트
 *
 * 현재 페이지의 위치를 계층 구조로 보여주는 내비게이션 컴포넌트입니다.
 *
 * @example
 * // 기본 사용법
 * <BreadCrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Music', href: '/music' },
 *     { label: 'Artist', href: '/music/artist' },
 *   ]}
 * />
 *
 * // 마지막 항목을 활성화 상태로 표시
 * <BreadCrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Music', href: '/music' },
 *     { label: 'Artist', href: '/music/artist' },
 *   ]}
 *   activeLastItem
 * />
 */
import { HTMLAttributes } from "react";

import Link from "next/link";

import cn from "@/lib/utils/cn";

/**
 * 기본 화살표 아이콘 SVG 컴포넌트
 */
const ChevronRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
};

export interface BreadCrumbItem {
  /** 표시할 레이블 */
  label: string;
  /** 이동할 링크 경로 (선택적) */
  href?: string;
}

export interface BreadCrumbsProps extends HTMLAttributes<HTMLElement> {
  /** 브레드크럼 항목 배열 */
  items: BreadCrumbItem[];
  /** 구분자 (기본값: 화살표 아이콘) */
  separator?: React.ReactNode;
  /** 마지막 항목을 활성화 상태로 표시 */
  activeLastItem?: boolean;
}

const BreadCrumbs = ({
  items,
  className,
  separator = <ChevronRightIcon />,
  activeLastItem = true,
  ...props
}: BreadCrumbsProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center text-sm text-gray-500", className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = isLast && activeLastItem;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors hover:text-gray-700",
                    isActive ? "font-medium text-gray-900" : "text-gray-500",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "text-sm",
                    isActive ? "font-medium text-gray-900" : "text-gray-500",
                  )}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-2 flex items-center text-gray-100" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
