import { useState } from "react";

import { BaseModal } from "./BaseModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BaseModal> = {
  title: "COMPONENTS/UI/Modal/BaseModal",
  component: BaseModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 옵션을 제공하는 기본 모달 컴포넌트입니다. 모달의 기본 구조와 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 함수",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "모달 크기",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "오버레이 클릭 시 모달 닫기 여부",
    },
    closeOnEsc: {
      control: "boolean",
      description: "ESC 키 누를 시 모달 닫기 여부",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    children: {
      control: "text",
      description: "모달 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

// 실제 사용 예시를 위한 래퍼 컴포넌트
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        모달 열기
      </button>
      <BaseModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </BaseModal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "기본 모달",
    size: "md",
    closeOnOverlayClick: true,
    closeOnEsc: true,
    children: <p className="text-gray-600">기본 모달 내용입니다.</p>,
    positiveButton: {
      text: "확인",
      onClick: () => {},
    },
    negativeButton: {
      text: "취소",
      onClick: () => {},
    },
  },
};

export const SmallModal: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "작은 모달",
    size: "sm",
    children: <p className="text-gray-600">작은 크기의 모달입니다.</p>,
    positiveButton: {
      text: "확인",
      onClick: () => {},
    },
  },
};

export const LargeModal: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "큰 모달",
    size: "lg",
    children: (
      <p className="text-gray-600">큰 크기의 모달입니다. 더 많은 내용을 표시할 수 있습니다.</p>
    ),
    positiveButton: {
      text: "확인",
      onClick: () => {},
    },
    negativeButton: {
      text: "취소",
      onClick: () => {},
    },
  },
};

export const CustomButtonStyle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "커스텀 버튼 스타일",
    size: "md",
    children: <p className="text-gray-600">버튼 스타일을 커스터마이징한 모달입니다.</p>,
    positiveButton: {
      text: "확인",
      onClick: () => {},
      style: {
        bgColor: "bg-green-600",
        textColor: "text-white",
        hoverBgColor: "bg-green-500",
        activeBgColor: "bg-green-700",
      },
    },
    negativeButton: {
      text: "취소",
      onClick: () => {},
      style: {
        bgColor: "bg-white",
        textColor: "text-red-600",
        border: true,
        borderColor: "border-red-600",
        hoverBgColor: "bg-red-50",
      },
    },
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    size: "md",
    children: <p className="text-gray-600">제목이 없는 모달입니다.</p>,
    positiveButton: {
      text: "확인",
      onClick: () => {},
    },
  },
};
