"use client";

/**
 * Dropdown 컴포넌트
 *
 * 사용자가 여러 옵션 중에서 선택할 수 있는 드롭다운 컴포넌트입니다.
 * 단일 선택 모드와 다중 선택 모드를 지원합니다.
 * 컴포지션 패턴을 통해 유연하게 구성할 수 있습니다.
 *
 * @example
 * // 단일 선택 모드
 * <Dropdown
 *   options={[
 *     { name: 'option1', label: '옵션 1' },
 *     { name: 'option2', label: '옵션 2' },
 *   ]}
 *   value="option1"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // 다중 선택 모드
 * <Dropdown
 *   multiple
 *   options={[
 *     { name: 'option1', label: '옵션 1' },
 *     { name: 'option2', label: '옵션 2' },
 *   ]}
 *   values={['option1']}
 *   onChange={(values) => console.log(values)}
 * />
 */
import {
  ReactElement,
  ReactNode,
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import cn from "@/lib/utils/cn";

export interface DropdownOption {
  /** 옵션의 고유 식별자 */
  name: string;
  /** 화면에 표시될 레이블 */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

// 드롭다운 컨텍스트 정의
interface DropdownContextProps {
  isOpen: boolean;
  selectedValues: string[];
  handleOptionClick: (name: string) => void;
  handleReset: (e: React.MouseEvent) => void;
  multiple: boolean;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

// 드롭다운 컨텍스트 사용 훅
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown 컴포넌트 내부에서 사용해야 합니다");
  }
  return context;
};

export interface DropdownProps {
  /** 드롭다운 옵션 배열 */
  options: DropdownOption[];
  /** 선택된 값 (단일 선택 모드) */
  value?: string;
  /** 선택된 값들 (다중 선택 모드) */
  values?: string[];
  /** 값 변경 시 호출되는 콜백 함수 */
  onChange: (value: string | string[]) => void;
  /** 다중 선택 모드 활성화 여부 */
  multiple?: boolean;
  /** 아무것도 선택되지 않았을 때 표시되는 텍스트 */
  placeholder?: string;
  /** 초기화 버튼 표시 여부 (다중 선택 모드에서만 사용) */
  canReset?: boolean;
  /** 드롭다운 버튼 왼쪽에 표시되는 아이콘 */
  icon?: ReactElement;
  /** 드롭다운 컴포넌트의 너비 */
  width?: string;
  /** 레이블을 굵게 표시할지 여부 */
  boldLabel?: boolean;
  /** 옵션 선택 후 드롭다운을 닫을지 여부 (단일 선택 모드에서만 사용) */
  closeOnSelect?: boolean;
  /** 추가 클래스 이름 */
  className?: string;
  /** 트리거 렌더 함수 (옵션) */
  renderTrigger?: (props: { label: string; isOpen: boolean }) => ReactNode;
}

/**
 * 드롭다운 루트 컴포넌트
 */
function Dropdown({
  options,
  value,
  values,
  onChange,
  multiple = false,
  placeholder = "선택하세요",
  canReset = true,
  icon,
  width,
  boldLabel,
  closeOnSelect = true,
  className,
  renderTrigger,
  children,
}: DropdownProps & { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 값 관리 - useMemo로 감싸기
  const selectedValues = useMemo(
    () => (multiple ? values || [] : value ? [value] : []),
    [multiple, values, value],
  );

  // 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 옵션 선택 처리
  const handleOptionClick = useCallback(
    (name: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(name)
          ? selectedValues.filter((v) => v !== name)
          : [...selectedValues, name];
        onChange(newValues);

        // 다중 선택 모드에서는 드롭다운을 계속 열어둠
      } else {
        onChange(name);

        // 단일 선택 모드이고 closeOnSelect가 true인 경우 드롭다운을 닫음
        if (closeOnSelect) {
          setIsOpen(false);
        }
      }
    },
    [multiple, selectedValues, onChange, closeOnSelect],
  );

  // 드롭다운 열기/닫기 토글
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 초기화 버튼 클릭 처리
  const handleReset = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(multiple ? [] : "");
      setIsOpen(false);
    },
    [multiple, onChange],
  );

  // 라벨 업데이트
  useEffect(() => {
    if (selectedValues.length === 0) {
      setLabel(placeholder);
    } else if (selectedValues.length === 1) {
      const selected = options.find((option) => option.name === selectedValues[0]);
      setLabel(selected ? selected.label : placeholder);
    } else {
      setLabel(`${selectedValues.length}개 선택됨`);
    }
  }, [selectedValues, options, placeholder]);

  // 컨텍스트 값
  const contextValue = useMemo(
    () => ({
      isOpen,
      selectedValues,
      handleOptionClick,
      handleReset,
      multiple,
      toggle,
    }),
    [isOpen, selectedValues, handleOptionClick, handleReset, multiple, toggle],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className={cn("relative self-center text-sm", className)}
        style={{ width }}
        ref={dropdownRef}
      >
        {renderTrigger ? (
          renderTrigger({ label, isOpen })
        ) : (
          <DropdownTrigger label={label} icon={icon} canReset={canReset} boldLabel={boldLabel} />
        )}

        {isOpen && (
          <DropdownContent>
            {options.map((option) => (
              <DropdownItem
                key={option.name}
                name={option.name}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </DropdownContent>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

/**
 * 드롭다운 트리거 컴포넌트
 */
const DropdownTrigger = memo(
  forwardRef<
    HTMLDivElement,
    {
      label: string;
      icon?: ReactElement;
      canReset?: boolean;
      boldLabel?: boolean;
    }
  >(function DropdownTrigger({ label, icon, canReset, boldLabel }, ref) {
    const { isOpen, selectedValues, handleReset, multiple, toggle } = useDropdown();

    return (
      <div
        ref={ref}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggle();
          }
        }}
        className={cn(
          "flex h-16 w-full cursor-pointer items-center justify-between rounded-2xs border border-gray-100 bg-white p-xs text-black",
          isOpen && "rounded-b-none",
        )}
      >
        <span
          className={cn(
            "flex items-center gap-1 text-left text-sm font-normal text-[#222]",
            selectedValues.length > 0 && "text-black",
            boldLabel && "font-semibold",
          )}
        >
          {icon}
          <span>{label}</span>
        </span>

        {canReset && multiple && selectedValues.length > 0 ? (
          <button
            type="button"
            onClick={(e) => handleReset(e)}
            className="flex cursor-pointer items-center border-none bg-transparent"
          >
            <svg
              stroke="#eaeaea"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="h-lg w-lg"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        ) : (
          <span
            className={cn(
              "flex items-center transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-lg w-lg"
            >
              <path
                d="M4 9L12 17L20 9"
                stroke="#EAEAEA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }),
);

/**
 * 드롭다운 콘텐츠 컴포넌트
 */
const DropdownContent = memo(function DropdownContent({ children }: { children: ReactNode }) {
  const { multiple } = useDropdown();

  return (
    <div
      id="dropdown-content"
      role="listbox"
      aria-multiselectable={multiple}
      className="absolute left-0 top-full z-10 max-h-[200px] w-full overflow-y-auto rounded-b-2xs border border-t-0 border-gray-100 bg-white"
    >
      {children}
    </div>
  );
});

/**
 * 드롭다운 아이템 컴포넌트
 */
const DropdownItem = memo(function DropdownItem({
  name,
  label,
  disabled,
}: {
  name: string;
  label: string;
  disabled?: boolean;
}) {
  const { selectedValues, handleOptionClick } = useDropdown();
  const isSelected = selectedValues.includes(name);

  return (
    <button
      type="button"
      onClick={() => handleOptionClick(name)}
      disabled={disabled}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between border-none bg-white px-xs py-3xs text-left text-sm text-black transition-all duration-200",
        isSelected && "font-medium",
        disabled && "cursor-default bg-gray-50 text-gray-200",
        !disabled && "hover:bg-gray-50",
      )}
    >
      <span className="flex-1">{label}</span>
      {isSelected && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-lg w-lg text-gray-800"
        >
          <path
            d="M13.3337 4L6.00033 11.3333L2.66699 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
});

// 하위 컴포넌트 내보내기
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

// displayName 추가
Dropdown.displayName = "Dropdown";
DropdownTrigger.displayName = "DropdownTrigger";
DropdownContent.displayName = "DropdownContent";
DropdownItem.displayName = "DropdownItem";

export default Dropdown;
