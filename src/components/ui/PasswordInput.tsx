import { InputHTMLAttributes, forwardRef, useState } from "react";

import { useErrorState, useInputControl } from "@/lib/hooks";
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
  /** 오류 초기화 시 호출될 콜백 */
  onErrorClear?: () => void;
  /** 레이아웃 방향 */
  direction?: "row" | "column";
}

/**
 * 비밀번호 입력에 특화된 컴포넌트
 *
 * 기본 Input 컴포넌트의 기능을 확장하여 비밀번호 입력에 최적화되었습니다.
 * - 기본적으로 마스킹된 입력 필드 제공
 * - 비밀번호 표시/숨김 토글 버튼
 * - 클리어 버튼 제공
 * - 접근성 고려 설계
 *
 * @example
 * // 기본 사용법
 * <PasswordInput placeholder="비밀번호를 입력하세요" />
 *
 * @example
 * // 유효성 검사와 함께 사용
 * <PasswordInput
 *   value={password}
 *   onChange={handleChange}
 *   error={passwordError}
 *   required
 * />
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
      onErrorClear,
      direction = "column",
      "aria-describedby": ariaDescribedby,
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

    // 입력값 관리
    const input = useInputControl(props);

    // 에러 상태 관리
    const errorState = useErrorState(error, onErrorClear);

    // 클리어 버튼 표시 여부
    const showClear = showClearButton && input.hasValue && !props.disabled;

    // 비밀번호 표시/숨김 토글 핸들러
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // 입력 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      input.handleChange(e);
    };

    // 초기화 핸들러
    const handleClear = () => {
      input.handleClear();
      errorState.clearError();

      // 포커스 처리
      const inputElement = ref as React.RefObject<HTMLInputElement>;
      if (inputElement && inputElement.current) {
        inputElement.current.focus();
      }
    };

    // ARIA describedby 설정
    const getAriaDescribedby = () => {
      const ids: string[] = [];
      if (errorState.error) ids.push(errorId);
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
                errorState.error ? "border-error" : "border-gray-100",
                props.disabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "bg-white",
                "focus:outline-none",
                errorState.error ? "focus:border-red-500" : "focus:border-gray-800",
                "[&:-webkit-autofill]:!border-gray-100 [&:-webkit-autofill]:text-md [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill_focus]:!border-gray-800",
                className,
              )}
              onChange={handleInputChange}
              value={input.value}
              aria-invalid={!!errorState.error}
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
        {errorState.error && (
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
            {errorState.error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
