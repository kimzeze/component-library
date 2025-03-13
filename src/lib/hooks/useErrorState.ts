import { useEffect, useState } from "react";

/**
 * 입력 필드의 에러 상태를 관리하는 커스텀 훅
 *
 * @param error 외부에서 제공되는 에러 메시지
 * @param onErrorClear 에러 초기화 시 호출될 콜백
 *
 * @returns 에러 상태 관리에 필요한 상태와 메소드
 */
export function useErrorState(error?: string, onErrorClear?: () => void) {
  const [localError, setLocalError] = useState(error);

  // 외부 에러 변경 감지
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    setLocalError(undefined);
    if (onErrorClear) {
      onErrorClear();
    }
  };

  return {
    error: localError,
    setError: setLocalError,
    clearError,
  };
}
