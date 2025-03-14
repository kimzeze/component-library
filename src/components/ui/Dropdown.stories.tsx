import Dropdown from "./Dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  title: "components/ui/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { name: "option1", label: "옵션 1" },
  { name: "option2", label: "옵션 2" },
  { name: "option3", label: "옵션 3" },
  { name: "option4", label: "옵션 4" },
  { name: "option5", label: "옵션 5 (비활성화)", disabled: true },
];

/**
 * 기본 단일 선택 드롭다운입니다.
 */
export const Default: Story = {
  args: {
    options,
    placeholder: "선택하세요",
    width: "250px",
  },
};

/**
 * 선택된 값이 있는 단일 선택 드롭다운입니다.
 */
export const Selected: Story = {
  args: {
    options,
    value: "option2",
    placeholder: "선택하세요",
    width: "250px",
  },
};

/**
 * 굵은 레이블을 사용하는 단일 선택 드롭다운입니다.
 */
export const BoldLabel: Story = {
  args: {
    options,
    value: "option3",
    placeholder: "선택하세요",
    width: "250px",
    boldLabel: true,
  },
};

/**
 * 다중 선택 모드의 드롭다운입니다.
 */
export const Multiple: Story = {
  args: {
    options,
    values: ["option1", "option3"],
    placeholder: "선택하세요",
    width: "250px",
    multiple: true,
  },
};

/**
 * 초기화 버튼이 없는 다중 선택 드롭다운입니다.
 */
export const MultipleNoReset: Story = {
  args: {
    options,
    values: ["option1", "option3"],
    placeholder: "선택하세요",
    width: "250px",
    multiple: true,
    canReset: false,
  },
};

/**
 * 사용자 정의 아이콘이 있는 드롭다운입니다.
 */
export const WithIcon: Story = {
  args: {
    options,
    value: "option1",
    placeholder: "선택하세요",
    width: "250px",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "8px" }}
      >
        <path
          d="M14.0002 14H2.00016C1.46973 14 1.00016 13.5305 1.00016 13V3C1.00016 2.46953 1.46973 2 2.00016 2H5.00016L6.00016 4H14.0002C14.5307 4 15.0002 4.46953 15.0002 5V13C15.0002 13.5305 14.5307 14 14.0002 14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

/**
 * 비활성화된 옵션이 있는 드롭다운입니다.
 */
export const WithDisabledOptions: Story = {
  args: {
    options,
    value: "option1",
    placeholder: "선택하세요",
    width: "250px",
  },
};

/**
 * 선택 후 드롭다운이 닫히지 않는 단일 선택 모드입니다.
 */
export const NoCloseOnSelect: Story = {
  args: {
    options,
    value: "option1",
    placeholder: "선택하세요",
    width: "250px",
    closeOnSelect: false,
  },
};

/**
 * 컴포지션 패턴을 사용한 커스텀 드롭다운입니다.
 */
export const CustomComposition: Story = {
  render: (args) => {
    const customOptions = [
      { name: "custom1", label: "커스텀 옵션 1" },
      { name: "custom2", label: "커스텀 옵션 2" },
      { name: "custom3", label: "커스텀 옵션 3" },
    ];

    return (
      <Dropdown
        {...args}
        options={customOptions}
        renderTrigger={({ label, isOpen }) => (
          <div className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-blue-500 p-3 text-white">
            <span>{label}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 9L12 17L20 9"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      />
    );
  },
};

/**
 * 완전 커스텀 구성의 드롭다운입니다.
 */
export const FullyCustom: Story = {
  render: () => {
    // 실제 사용 시에는 상태 관리와 이벤트 핸들러를 구현해야 합니다
    return (
      <div className="relative w-64">
        <Dropdown options={[]} onChange={() => {}} className="w-full">
          <Dropdown.Trigger label="커스텀 드롭다운" boldLabel />
          <Dropdown.Content>
            <Dropdown.Item name="item1" label="커스텀 아이템 1" />
            <Dropdown.Item name="item2" label="커스텀 아이템 2" />
            <div className="bg-gray-50 p-2 text-center text-sm text-gray-500">
              커스텀 콘텐츠도 추가할 수 있습니다
            </div>
            <Dropdown.Item name="item3" label="커스텀 아이템 3" />
          </Dropdown.Content>
        </Dropdown>
      </div>
    );
  },
};
