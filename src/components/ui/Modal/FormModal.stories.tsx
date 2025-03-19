import { useState } from "react";

import { FormModal } from "./FormModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FormModal> = {
  title: "COMPONENTS/UI/Modal/FormModal",
  component: FormModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "폼 제출 기능이 있는 모달 컴포넌트입니다. 폼 데이터 입력 및 제출에 사용됩니다.",
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
    onSubmit: {
      action: "submitted",
      description: "폼 제출 시 실행할 함수",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    submitText: {
      control: "text",
      description: "제출 버튼 텍스트",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "모달 크기",
    },
    isSubmitting: {
      control: "boolean",
      description: "제출 중 상태",
    },
    submitButtonStyle: {
      control: "object",
      description: "제출 버튼 스타일 커스터마이징",
    },
    cancelButtonStyle: {
      control: "object",
      description: "취소 버튼 스타일 커스터마이징",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

// 실제 사용 예시를 위한 래퍼 컴포넌트
const FormModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("폼 제출됨:", new FormData(e.target as HTMLFormElement));
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        폼 모달 열기
      </button>
      <FormModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {args.children}
      </FormModal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <FormModalWrapper {...args} />,
  args: {
    title: "사용자 정보",
    submitText: "저장",
    cancelText: "취소",
    size: "md",
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    ),
  },
};

export const LargeForm: Story = {
  render: (args) => <FormModalWrapper {...args} />,
  args: {
    title: "상세 정보 입력",
    submitText: "제출",
    cancelText: "취소",
    size: "lg",
    children: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              성
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            전화번호
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            주소
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    ),
  },
};

export const CustomButtonStyle: Story = {
  render: (args) => <FormModalWrapper {...args} />,
  args: {
    title: "커스텀 버튼 스타일",
    submitText: "등록",
    cancelText: "취소",
    size: "md",
    submitButtonStyle: {
      bgColor: "bg-green-600",
      textColor: "text-white",
      hoverBgColor: "bg-green-500",
    },
    cancelButtonStyle: {
      bgColor: "bg-white",
      textColor: "text-gray-700",
      border: true,
      borderColor: "border-gray-300",
      hoverBgColor: "bg-gray-100",
    },
    children: (
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    ),
  },
};

export const Submitting: Story = {
  render: (args) => <FormModalWrapper {...args} isSubmitting={true} />,
  args: {
    title: "제출 중 상태",
    submitText: "저장 중...",
    cancelText: "취소",
    size: "md",
    isSubmitting: true,
    children: (
      <div>
        <p className="mb-4 text-gray-600">제출 중 상태일 때 버튼이 비활성화됩니다.</p>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    ),
  },
};
