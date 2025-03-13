import PasswordInput from "./PasswordInput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UI/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["column", "row"],
    },
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

export const WithOnErrorClear: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    error: "비밀번호는 특수문자를 포함해야 합니다.",
    onErrorClear: () => console.log("Error cleared"),
  },
};
