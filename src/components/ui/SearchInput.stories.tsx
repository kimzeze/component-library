import SearchInput from "./SearchInput";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * `SearchInput` 컴포넌트는 검색 기능에 특화된 입력 필드입니다.
 * 검색 아이콘이 포함되어 있고, 자동 검색 및 즉시 검색 기능을 제공합니다.
 */
const meta = {
  title: "Components/UI/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["column", "row"],
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 검색 입력 필드입니다.
 */
export const Default: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
  },
};

/**
 * 라벨이 있는 검색 입력 필드입니다.
 */
export const WithLabel: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
  },
};

/**
 * 자동 검색이 비활성화된 검색 입력 필드입니다. Enter 키 입력으로만 검색이 실행됩니다.
 */
export const ManualSearch: Story = {
  args: {
    placeholder: "검색 후 Enter 키를 누르세요",
    autoSearch: false,
  },
};

/**
 * 긴 딜레이를 가진 자동 검색 입력 필드입니다. 타이핑 후 1초 뒤에 검색이 실행됩니다.
 */
export const LongDelay: Story = {
  args: {
    placeholder: "타이핑 후 1초 뒤에 검색됩니다",
    autoSearch: true,
    searchDelay: 1000,
  },
};

/**
 * 가로(row) 레이아웃을 사용하는 검색 입력 필드입니다.
 */
export const RowDirection: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    direction: "row",
  },
};

/**
 * 오류 메시지가 있는 검색 입력 필드입니다.
 */
export const WithError: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    error: "검색어는 2자 이상이어야 합니다.",
  },
};

export const Disabled: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    value: "초기 검색어",
  },
};

export const Required: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    required: true,
  },
};
