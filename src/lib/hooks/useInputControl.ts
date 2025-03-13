import { useState } from "react";

/**
 * 입력 컴포넌트의 값을 제어하기 위한 커스텀 훅
 *
 * @param options 입력 제어 옵션
 * @param options.value 제어 모드에서 사용되는 값
 * @param options.defaultValue 비제어 모드에서 사용되는 초기값
 * @param options.onChange 값 변경 시 호출될 콜백
 * @param options.onClear 값 초기화 시 호출될 콜백
 *
 * @returns 입력 값 제어에 필요한 상태와 메소드
 */
export function useInputControl(options: {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
}) {
  // 제어/비제어 모드 처리
  const [uncontrolledValue, setUncontrolledValue] = useState(options.defaultValue || "");
  const isControlled = options.value !== undefined;
  const value = isControlled ? options.value : uncontrolledValue;

  // 내용이 있는지 확인
  const hasValue = Boolean(value);

  /**
   * 입력값 변경 처리
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }

    if (options.onChange) {
      options.onChange(e);
    }
  };

  /**
   * 입력값 초기화 처리
   */
  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    }

    // 제어 모드일 경우 부모에게 변경 알림
    if (options.onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      options.onChange(syntheticEvent);
    }

    if (options.onClear) {
      options.onClear();
    }
  };

  return {
    value,
    hasValue,
    isControlled,
    handleChange,
    handleClear,
  };
}
