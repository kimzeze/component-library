import Avatar from "./Avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Avatar> = {
  title: "Components/UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "사용자 프로필 이미지를 표시하는 아바타 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "이미지 URL",
    },
    alt: {
      control: "text",
      description: "대체 텍스트 (접근성)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "아바타 크기",
    },
    shape: {
      control: "radio",
      options: ["circle", "square"],
      description: "아바타 모양",
    },
    border: {
      control: "boolean",
      description: "테두리 적용 여부",
    },
    borderRadius: {
      control: "text",
      description: "border-radius 직접 설정 (shape보다 우선 적용)",
    },
    bgColor: {
      control: "text",
      description: "배경 색상 (이미지가 없을 때)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "/images/avatar.png",
    alt: "사용자 이미지",
    size: "md",
  },
};

export const Fallback: Story = {
  args: {
    size: "md",
  },
};

export const Square: Story = {
  args: {
    src: "/images/avatar.png",
    shape: "square",
    size: "md",
  },
};

export const WithBorder: Story = {
  args: {
    src: "/images/avatar.png",
    border: true,
    size: "md",
  },
};

export const CustomBorderRadius: Story = {
  args: {
    src: "/images/avatar.png",
    borderRadius: "8px",
    size: "md",
  },
};

export const CustomBackground: Story = {
  args: {
    bgColor: "bg-blue-100",
    size: "md",
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" />
      <Avatar size="sm" />
      <Avatar size="md" />
      <Avatar size="lg" />
      <Avatar size="xl" />
    </div>
  ),
};

export const ShapeVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar src="/images/avatar.png" shape="circle" size="lg" />
      <Avatar src="/images/avatar.png" shape="square" size="lg" />
      <Avatar src="/images/avatar.png" borderRadius="4px" size="lg" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">이미지 아바타</h3>
        <div className="flex gap-4">
          <Avatar src="/images/avatar.png" size="md" />
          <Avatar src="/images/avatar.png" size="md" shape="square" />
          <Avatar src="/images/avatar.png" size="md" border />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">폴백 아바타</h3>
        <div className="flex gap-4">
          <Avatar size="md" />
          <Avatar size="md" bgColor="bg-blue-100" />
          <Avatar size="md" bgColor="bg-green-100" />
          <Avatar size="md" bgColor="bg-amber-100" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">크기 변형</h3>
        <div className="flex items-end gap-4">
          <Avatar size="xs" />
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
          <Avatar size="xl" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">테두리와 모양</h3>
        <div className="flex gap-4">
          <Avatar size="md" border />
          <Avatar size="md" shape="square" />
          <Avatar size="md" borderRadius="4px" />
          <Avatar size="md" borderRadius="12px" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
