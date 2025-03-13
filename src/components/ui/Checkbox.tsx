"use client";

/**
 * Checkbox 컴포넌트
 *
 * 사용자가 여러 옵션 중에서 선택할 수 있는 체크박스 컴포넌트입니다.
 * 다양한 크기와 상태를 지원합니다.
 *
 * @example
 * // 기본 사용법
 * <Checkbox label="동의합니다" />
 *
 * // 기본 선택 상태
 * <Checkbox label="동의합니다" defaultChecked />
 *
 * // 제어 컴포넌트로 사용
 * <Checkbox label="동의합니다" checked={isChecked} onChange={handleChange} />
 *
 * // 비활성화 상태
 * <Checkbox label="비활성화 옵션" disabled />
 *
 * // 크기 조정
 * <Checkbox label="큰 체크박스" size={24} />
 */
import { InputHTMLAttributes, forwardRef, useEffect, useId, useState } from "react";

import cn from "@/lib/utils/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** 체크박스 옆에 표시될 라벨 텍스트 */
  label?: string;
  /** 체크박스의 크기 (픽셀 단위, 기본값: 18) */
  size?: number;
  /** 체크박스 비활성화 여부 */
  disabled?: boolean;
  /** 포커스 표시 숨김 여부 */
  hideFocus?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      className,
      id,
      size = 18,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      hideFocus = false,
      ...props
    },
    ref,
  ) => {
    /* 체크박스 고유 ID 생성 */
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    // 체크박스 상태 관리
    const [isChecked, setIsChecked] = useState(defaultChecked || false);

    // 외부에서 제어되는 경우 상태 동기화
    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    /* 체크박스 토글 핸들러 */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 제어 컴포넌트가 아닌 경우에만 내부 상태 업데이트
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }

      // 외부 onChange 핸들러 호출
      if (onChange) {
        onChange(e);
      }
    };

    // 현재 체크박스 상태
    const currentChecked = checked !== undefined ? checked : isChecked;

    // 커스텀 체크 마크 렌더링
    const renderCheckmark = () => {
      if (currentChecked) {
        return (
          <svg
            width={size * 0.7}
            height={size * 0.7}
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L20 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      }
      return null;
    };

    return (
      <div className={cn("inline-flex items-center", className)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={currentChecked}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              // 기본 속성 제거
              "appearance-none",
              // 기본 스타일
              "h-[18px] w-[18px] rounded-[5px] border border-gray-100 bg-white",
              // 체크됐을 때의 스타일
              "checked:bg-primary-600",
              // 포커스 됐을 때의 스타일
              "focus:outline-none",
              // 호버 됐을 때의 스타일
              "cursor-pointer hover:border-gray-200",
              // 비활성화 됐을 때의 스타일
              "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200",
              "disabled:checked:bg-gray-400",
            )}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            {...props}
          />
          {renderCheckmark()}
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              "select-none pl-4xs text-sm",
              disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-gray-700",
            )}
            style={{ lineHeight: "1.5" }}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
