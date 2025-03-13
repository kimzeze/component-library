import Checkbox from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 여러 옵션 중에서 선택할 수 있는 체크박스 컴포넌트입니다. 다양한 크기와 상태를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "체크박스 옆에 표시될 라벨 텍스트",
    },
    checked: {
      control: "boolean",
      description: "체크박스의 선택 상태 (제어 컴포넌트로 사용할 때)",
    },
    defaultChecked: {
      control: "boolean",
      description: "체크박스의 초기 선택 상태",
    },
    disabled: {
      control: "boolean",
      description: "체크박스 비활성화 여부",
    },
    size: {
      control: { type: "range", min: 14, max: 32, step: 2 },
      description: "체크박스의 크기 (픽셀 단위)",
    },
    hideFocus: {
      control: "boolean",
      description: "포커스 표시 숨김 여부",
    },
    onChange: {
      action: "changed",
      description: "체크박스 상태 변경 시 호출되는 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "기본 체크박스",
  },
};

export const Checked: Story = {
  args: {
    label: "선택된 체크박스",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화 체크박스",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "비활성화된 선택 체크박스",
    disabled: true,
    checked: true,
  },
};

export const LargeSize: Story = {
  args: {
    label: "큰 체크박스",
    size: 24,
  },
};

export const NoLabel: Story = {
  args: {
    size: 18,
  },
};

// 다양한 상태와 크기를 한번에 보여주는 예시
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700">기본 상태</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="체크되지 않음" />
          <Checkbox label="체크됨" defaultChecked />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700">비활성화 상태</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="비활성화 (체크되지 않음)" disabled />
          <Checkbox label="비활성화 (체크됨)" disabled defaultChecked />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700">크기 변형</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="작은 크기 (14px)" size={14} />
          <Checkbox label="기본 크기 (18px)" size={18} />
          <Checkbox label="큰 크기 (24px)" size={24} />
          <Checkbox label="더 큰 크기 (32px)" size={32} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
