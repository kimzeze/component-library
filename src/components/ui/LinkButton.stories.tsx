import LinkButton from "./LinkButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LinkButton> = {
  title: "COMPONENTS/UI/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button 컴포넌트와 동일한 스타일링을 제공하는 라우터 이동용 링크 컴포넌트입니다.",
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
    href: {
      control: "text",
      description: "이동할 경로",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {
  args: {
    color: "white",
    children: "기본 링크 버튼",
    href: "#",
  },
};

export const Secondary: Story = {
  args: {
    color: "black",
    children: "검은색 링크 버튼",
    href: "#",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화 링크 버튼",
    href: "#",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 링크 버튼",
    href: "#",
  },
};

export const CustomSize: Story = {
  args: {
    width: 200,
    height: 48,
    children: "커스텀 크기 링크 버튼",
    href: "#",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <LinkButton href="#" color="white">
          기본 링크 버튼
        </LinkButton>
        <LinkButton href="#" color="black">
          검은색 링크 버튼
        </LinkButton>
      </div>
      <div className="flex gap-4">
        <LinkButton href="#" color="white" disabled>
          비활성화 (흰색)
        </LinkButton>
        <LinkButton href="#" color="black" disabled>
          비활성화 (검은색)
        </LinkButton>
      </div>
      <div className="mb-4">
        <LinkButton href="#" fullWidth>
          전체 너비 링크 버튼
        </LinkButton>
      </div>
      <div className="flex gap-4">
        <LinkButton href="#" width={120}>
          너비 120px
        </LinkButton>
        <LinkButton href="#" height={60}>
          높이 60px
        </LinkButton>
        <LinkButton href="#" width={150} height={70}>
          커스텀 크기
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
