import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "COMPONENTS/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 색상과 크기 옵션을 제공하는 기본 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["white", "black"],
      description: "버튼 색상",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    fullWidth: {
      control: "boolean",
      description: "버튼을 부모 요소의 전체 너비로 확장",
    },
    width: {
      control: "text",
      description: "버튼의 너비 (픽셀 또는 CSS 값)",
    },
    height: {
      control: "text",
      description: "버튼의 높이 (픽셀 또는 CSS 값)",
    },
    onClick: { action: "clicked" },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: "white",
    children: "기본 버튼",
  },
};

export const Secondary: Story = {
  args: {
    color: "black",
    children: "보조 버튼",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화 버튼",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 버튼",
  },
};

export const CustomSize: Story = {
  args: {
    width: 200,
    height: 48,
    children: "커스텀 크기 버튼",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button color="white">기본 버튼</Button>
        <Button color="black">검은색 버튼</Button>
      </div>
      <div className="flex gap-4">
        <Button color="white" disabled>
          비활성화 (흰색)
        </Button>
        <Button color="black" disabled>
          비활성화 (검은색)
        </Button>
      </div>
      <div className="mb-4">
        <Button fullWidth>전체 너비 버튼</Button>
      </div>
      <div className="flex gap-4">
        <Button width={120}>너비 120px</Button>
        <Button height={60}>높이 60px</Button>
        <Button width={150} height={70}>
          커스텀 크기
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
