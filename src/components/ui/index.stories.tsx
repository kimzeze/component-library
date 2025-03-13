import { Button, Checkbox, Input, PasswordInput } from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Overview",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-8 p-6">
      <div>
        <h2 className="mb-4 text-xl font-bold">버튼</h2>
        <div className="flex flex-wrap gap-4">
          <Button>기본 버튼</Button>
          <Button color="black">검은색 버튼</Button>
          <Button fullWidth>전체 너비 버튼</Button>
          <Button width={120}>너비 120px</Button>
          <Button height={60}>높이 60px</Button>
          <Button width={150} height={70}>
            커스텀 크기
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">체크박스</h2>
        <div className="flex flex-col gap-2">
          <Checkbox label="기본 체크박스" />
          <Checkbox label="선택된 체크박스" checked />
          <Checkbox label="비활성화 체크박스" disabled />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">입력</h2>
        <div className="flex flex-col gap-4">
          <Input label="이름" placeholder="이름을 입력하세요" />
          <Input label="이메일" placeholder="이메일 주소를 입력하세요" required />
          <Input label="오류 예시" value="잘못된 입력" error="올바른 형식이 아닙니다" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">비밀번호 입력</h2>
        <div className="flex flex-col gap-4">
          <PasswordInput label="비밀번호" placeholder="비밀번호를 입력하세요" />
          <PasswordInput label="새 비밀번호" placeholder="새 비밀번호를 입력하세요" required />
          <PasswordInput label="오류 예시" value="1234" error="비밀번호는 8자 이상이어야 합니다" />
        </div>
      </div>
    </div>
  ),
};
