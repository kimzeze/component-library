import PasswordInput from "./PasswordInput";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * `PasswordInput` 컴포넌트는 비밀번호 입력에 특화된 입력 컴포넌트입니다.
 * 비밀번호 표시/숨김 기능과 클리어 버튼을 제공하며, react-hook-form과 호환됩니다.
 */
const meta = {
  title: "Components/UI/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "비밀번호 입력에 특화된 컴포넌트입니다. 표시/숨김 토글 기능을 제공하며, react-hook-form의 register 함수와 호환되도록 설계되었습니다.",
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
      control: { type: "radio" },
      options: ["column", "row"],
      description: "레이아웃 방향",
    },
    onChange: { action: "changed" },
    onClear: { action: "cleared" },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    error: "비밀번호는 8자 이상이어야 합니다.",
  },
};

export const Disabled: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    disabled: true,
    value: "비활성화된 비밀번호",
  },
};

export const RowDirection: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    direction: "row",
  },
};

export const WithValue: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    value: "초기값123!",
    required: true,
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
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다")
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        {...register("password")}
        label="비밀번호"
        error={errors.password?.message}
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
