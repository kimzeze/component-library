import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import Input, { InputProps } from "./Input";
import cn from "@/lib/utils/cn";

export interface SearchInputProps extends Omit<InputProps, "type"> {
  /** 검색 이벤트 발생 시 호출될 콜백 */
  onSearch?: (value: string) => void;
  /** 검색창 내 표시될 안내 텍스트 */
  placeholder?: string;
  /** 자동 검색 활성화 여부 */
  autoSearch?: boolean;
  /** 자동 검색 시 딜레이 시간 (밀리초) */
  searchDelay?: number;
}

/**
 * 검색에 특화된 입력 컴포넌트
 *
 * 기본 Input 컴포넌트를 확장하여 검색 기능에 최적화된 경험을 제공합니다.
 * - 검색 아이콘이 왼쪽에 표시됨
 * - 타이핑 후 자동 검색 기능 (debounce)
 * - Enter 키로 즉시 검색 가능
 * - 모든 Input 컴포넌트의 기능 지원
 *
 * @example
 * // 기본 사용법
 * <SearchInput onSearch={(value) => console.log('검색:', value)} />
 *
 * @example
 * // 자동 검색 딜레이 조정
 * <SearchInput autoSearch={true} searchDelay={500} />
 */
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      placeholder = "검색어를 입력하세요",
      autoSearch = true,
      searchDelay = 300,
      onChange,
      onKeyDown,
      className,
      ...props
    },
    ref,
  ) => {
    // 타이머 참조 저장
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

    // 마지막 검색어 추적
    const [lastSearched, setLastSearched] = useState<string>("");

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
      return () => {
        if (searchTimerRef.current) {
          clearTimeout(searchTimerRef.current);
        }
      };
    }, []);

    /**
     * 검색 실행 함수
     */
    const executeSearch = useCallback(
      (value: string) => {
        if (value === lastSearched) return; // 이미 검색된 값이면 스킵

        if (onSearch) {
          onSearch(value);
          setLastSearched(value);
        }
      },
      [onSearch, lastSearched],
    );

    /**
     * 입력 변경 핸들러 (자동 검색 지원)
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      if (autoSearch) {
        // 이전 타이머 정리
        if (searchTimerRef.current) {
          clearTimeout(searchTimerRef.current);
        }

        // 새 타이머 설정 (debounce)
        const value = e.target.value;
        searchTimerRef.current = setTimeout(() => {
          executeSearch(value);
        }, searchDelay);
      }
    };

    /**
     * 키 입력 핸들러 (Enter 키)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(e);
      }

      if (e.key === "Enter") {
        // Enter 키 입력 시 즉시 검색 실행
        const target = e.target as HTMLInputElement;

        // 자동 검색 타이머 취소
        if (searchTimerRef.current) {
          clearTimeout(searchTimerRef.current);
        }

        executeSearch(target.value);
      }
    };

    // 검색 아이콘 요소
    const searchIcon = (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-xs">
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
          className="text-gray-400"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    );

    // Input에 아이콘 영역을 위한 왼쪽 패딩 적용 - 패딩 증가
    const inputClassName = cn("pl-5xl pr-xs", className);

    return (
      <Input
        ref={ref}
        type="search"
        className={inputClassName}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        role="searchbox"
        inputDecorator={searchIcon}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
