import Input from "./Input";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * `Input` 컴포넌트는 사용자로부터 텍스트 입력을 받기 위한 기본적인 UI 요소입니다.
 *
 * 다양한 형태의 입력 필드를 구현할 수 있으며, 라벨, 오류 메시지, 필수 입력 표시 등의 기능을 제공합니다.
 * row와 column 레이아웃을 지원하고, 클리어 버튼을 통해 빠르게 입력을 삭제할 수 있습니다.
 */
const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "기본 텍스트 입력을 위한 컴포넌트입니다. react-hook-form과 호환되도록 설계되었으며, 접근성을 고려한 설계로 다양한 사용자 경험을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "입력 필드 위에 표시될 라벨",
    },
    placeholder: {
      control: "text",
      description: "입력 필드 내 표시될 안내 텍스트",
    },
    required: {
      control: "boolean",
      description: "필수 입력 필드 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    error: {
      control: "text",
      description: "오류 메시지",
    },
    showClearButton: {
      control: "boolean",
      description: "클리어 버튼 표시 여부",
    },
    direction: {
      control: "radio",
      options: ["row", "column"],
      description: "레이아웃 방향",
    },
    onChange: { action: "changed" },
    onClear: { action: "cleared" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * 가장 기본적인 입력 필드입니다.
 */
export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요",
  },
};

/**
 * 라벨이 있는 입력 필드입니다.
 */
export const WithLabel: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

/**
 * 필수 입력 필드로 표시됩니다. 라벨 옆에 빨간색 별표(*)가 표시됩니다.
 */
export const Required: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일 주소를 입력하세요",
    required: true,
  },
};

/**
 * 오류 메시지가 있는 입력 필드입니다. 테두리가 빨간색으로 변경되고 아래에 오류 메시지가 표시됩니다.
 */
export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일 주소를 입력하세요",
    value: "잘못된 이메일@a.com",
    error: "올바른 이메일 형식이 아닙니다",
  },
};

/**
 * 비활성화된 입력 필드입니다. 사용자가 상호작용할 수 없습니다.
 */
export const Disabled: Story = {
  args: {
    label: "사용자 ID",
    placeholder: "사용할 수 없음",
    disabled: true,
  },
};

/**
 * 가로(row) 레이아웃을 사용하는 입력 필드입니다. 라벨이 왼쪽에 표시됩니다.
 */
export const RowDirection: Story = {
  args: {
    label: "검색어",
    placeholder: "검색어를 입력하세요",
    direction: "row",
  },
};

/**
 * 초기값이 설정된 입력 필드입니다. 클리어 버튼을 통해 입력을 빠르게 삭제할 수 있습니다.
 */
export const WithValue: Story = {
  args: {
    label: "취미",
    value: "코딩",
    showClearButton: true,
  },
};

/**
 * react-hook-form과 함께 사용하는 예시입니다.
 */
export const WithReactHookForm: Story = {
  render: () => {
    // 예시 코드만 보여주기 위한 용도로, 실제 코드는 실행되지 않습니다.
    return (
      <div>
        <h3 className="mb-4 text-lg font-bold">사용 예시 코드</h3>
        <pre className="rounded bg-gray-100 p-4">
          {`
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다")
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        label="이메일"
        error={errors.email?.message}
        required
      />
      <button type="submit">제출</button>
    </form>
  );
}
          `}
        </pre>
      </div>
    );
  },
};
