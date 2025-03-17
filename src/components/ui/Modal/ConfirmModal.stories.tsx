import { useState } from "react";

import { ConfirmModal } from "./ConfirmModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConfirmModal> = {
  title: "COMPONENTS/UI/Modal/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자 확인이 필요한 작업에 사용되는 모달 컴포넌트입니다. 확인/취소 버튼을 제공합니다.",
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
    onConfirm: {
      action: "confirmed",
      description: "확인 버튼 클릭 시 실행할 함수",
    },
    message: {
      control: "text",
      description: "확인 메시지",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트",
    },
    confirmButtonStyle: {
      control: "object",
      description: "확인 버튼 스타일 커스터마이징",
    },
    cancelButtonStyle: {
      control: "object",
      description: "취소 버튼 스타일 커스터마이징",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

// 실제 사용 예시를 위한 래퍼 컴포넌트
const ConfirmModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        확인 모달 열기
      </button>
      <ConfirmModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log("확인됨");
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "확인",
    message: "이 작업을 진행하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
  },
};

export const Delete: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "삭제 확인",
    message: "이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    confirmText: "삭제",
    cancelText: "취소",
    confirmButtonStyle: {
      bgColor: "bg-red-600",
      textColor: "text-white",
      hoverBgColor: "bg-red-500",
    },
  },
};

export const Save: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "저장 확인",
    message: "변경사항을 저장하시겠습니까?",
    confirmText: "저장",
    cancelText: "취소",
    confirmButtonStyle: {
      bgColor: "bg-green-600",
      textColor: "text-white",
      hoverBgColor: "bg-green-500",
    },
  },
};

export const CustomButtons: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "커스텀 버튼",
    message: "커스텀 스타일의 버튼을 가진 확인 모달입니다.",
    confirmText: "예",
    cancelText: "아니오",
    confirmButtonStyle: {
      bgColor: "bg-purple-600",
      textColor: "text-white",
      hoverBgColor: "bg-purple-500",
    },
    cancelButtonStyle: {
      bgColor: "bg-white",
      textColor: "text-gray-700",
      border: true,
      borderColor: "border-gray-300",
      hoverBgColor: "bg-gray-100",
    },
  },
};

export const Warning: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "주의",
    message: "이 작업은 시스템에 영향을 줄 수 있습니다. 계속하시겠습니까?",
    confirmText: "계속",
    cancelText: "취소",
    confirmButtonStyle: {
      bgColor: "bg-yellow-600",
      textColor: "text-white",
      hoverBgColor: "bg-yellow-500",
    },
  },
};
