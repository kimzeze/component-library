import { useState } from "react";

import { AlertModal } from "./AlertModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AlertModal> = {
  title: "COMPONENTS/UI/Modal/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "단순 알림용 모달 컴포넌트입니다. 확인 버튼만 제공합니다.",
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
    message: {
      control: "text",
      description: "알림 메시지",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    buttonStyle: {
      control: "object",
      description: "버튼 스타일 커스터마이징",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

// 실제 사용 예시를 위한 래퍼 컴포넌트
const AlertModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        알림 모달 열기
      </button>
      <AlertModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "알림",
    message: "작업이 성공적으로 완료되었습니다.",
    confirmText: "확인",
  },
};

export const Success: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "성공",
    message: "데이터가 성공적으로 저장되었습니다.",
    confirmText: "확인",
    buttonStyle: {
      bgColor: "bg-green-600",
      textColor: "text-white",
      hoverBgColor: "bg-green-500",
    },
  },
};

export const Error: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "오류",
    message: "작업 중 오류가 발생했습니다. 다시 시도해주세요.",
    confirmText: "확인",
    buttonStyle: {
      bgColor: "bg-red-600",
      textColor: "text-white",
      hoverBgColor: "bg-red-500",
    },
  },
};

export const Warning: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "주의",
    message: "이 작업은 되돌릴 수 없습니다.",
    confirmText: "확인했습니다",
    buttonStyle: {
      bgColor: "bg-yellow-600",
      textColor: "text-white",
      hoverBgColor: "bg-yellow-500",
    },
  },
};

export const CustomTitle: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "커스텀 제목",
    message: "커스텀 제목을 가진 알림 모달입니다.",
    confirmText: "닫기",
  },
};
