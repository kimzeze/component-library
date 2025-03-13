"use client";

import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";

import cn from "@/lib/utils/cn";

// 아이콘 컴포넌트를 인라인으로 정의합니다
const EyeOn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOff = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 라벨 */
  label?: string;
  /** 필수 입력 필드 여부 */
  required?: boolean;
  /** 오류 메시지 */
  error?: string;
  /** 클리어 버튼 표시 여부 */
  showClearButton?: boolean;
  /** 클리어 버튼 클릭 시 호출될 콜백 */
  onClear?: () => void;
  /** 레이아웃 방향 */
  direction?: "row" | "column";
}

/**
 * 비밀번호 입력에 특화된 컴포넌트
 *
 * react-hook-form의 register 함수와 호환되도록 설계되었습니다.
 * - 기본적으로 마스킹된 입력 필드 제공
 * - 비밀번호 표시/숨김 토글 버튼
 * - 클리어 버튼 제공
 * - 접근성 고려 설계
 *
 * @example
 * // react-hook-form과 함께 사용
 * <PasswordInput {...register("password")} error={errors.password?.message} />
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      id: propId,
      className,
      required = false,
      error,
      showClearButton = true,
      onClear,
      direction = "column",
      "aria-describedby": ariaDescribedby,
      value,
      onChange,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    // ID 생성 (props에서 제공되지 않은 경우 자동 생성)
    const [uniqueId] = useState(
      () => propId || `password-${Math.random().toString(36).substring(2, 9)}`,
    );
    const errorId = `${uniqueId}-error`;

    // 비밀번호 표시 상태
    const [showPassword, setShowPassword] = useState(false);

    // 로컬 상태로 입력값 트래킹
    const [hasInputValue, setHasInputValue] = useState(Boolean(value || defaultValue));

    // 입력 변경 감지
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasInputValue(!!e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    // value prop이 변경될 때마다 hasInputValue 업데이트
    useEffect(() => {
      setHasInputValue(Boolean(value));
    }, [value]);

    // 클리어 버튼 표시 여부
    const showClear = showClearButton && hasInputValue && !props.disabled;

    // 비밀번호 표시/숨김 토글 핸들러
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // 초기화 핸들러
    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        // 합성 이벤트 생성 및 발생
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }

      // 로컬 상태 업데이트
      setHasInputValue(false);
    };

    // ARIA describedby 설정
    const getAriaDescribedby = () => {
      const ids: string[] = [];
      if (error) ids.push(errorId);
      if (ariaDescribedby) ids.push(ariaDescribedby);
      return ids.length > 0 ? ids.join(" ") : undefined;
    };

    return (
      <div className="w-full">
        <div
          className={cn("flex", direction === "row" ? "flex-row items-center gap-4" : "flex-col")}
        >
          {/* 라벨 */}
          {label && (
            <div
              className={cn(
                "flex flex-row items-center",
                direction === "column" ? "mb-3xs" : "min-w-[100px]",
              )}
            >
              <label
                htmlFor={uniqueId}
                className={cn(
                  "text-md font-medium text-gray-800",
                  props.disabled && "text-gray-400",
                )}
              >
                {label}
                {required && (
                  <span className="ml-5xs text-red-500" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
            </div>
          )}

          {/* 인풋 */}
          <div className={cn("relative", direction === "row" ? "flex-1" : "w-full")}>
            <input
              ref={ref}
              id={uniqueId}
              type={showPassword ? "text" : "password"}
              className={cn(
                "duration-250 w-full rounded-2xs border py-xs pl-xs pr-[70px] text-md transition-[border-color]",
                error ? "border-error" : "border-gray-100",
                props.disabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "bg-white",
                "focus:outline-none",
                error ? "focus:border-red-500" : "focus:border-gray-800",
                "[&:-webkit-autofill]:!border-gray-100 [&:-webkit-autofill]:text-md [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill_focus]:!border-gray-800",
                className,
              )}
              value={value}
              defaultValue={defaultValue}
              onChange={handleInputChange}
              aria-invalid={!!error}
              aria-describedby={getAriaDescribedby()}
              aria-required={required}
              {...props}
            />

            {/* 비밀번호 표시/숨김 버튼 */}
            {!props.disabled && (
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 transform rounded-full p-3xs text-gray-200 transition-all hover:text-gray-300"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
                style={{ right: showClear ? "30px" : "5px" }}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOn /> : <EyeOff />}
              </button>
            )}

            {/* 클리어 버튼 */}
            {showClear && (
              <button
                type="button"
                className="absolute right-3xs top-1/2 -translate-y-1/2 transform rounded-full p-3xs text-gray-200 transition-all hover:text-gray-300"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="입력 내용 지우기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 에러 메시지 - 항상 인풋 아래에 표시 */}
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="assertive"
            className={cn(
              "mt-1.5 pl-4xs text-sm text-error transition-opacity duration-300 ease-in",
              direction === "row" && "ml-[110px]",
            )}
            style={{ animation: "fadeInDown 0.3s ease-out" }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
