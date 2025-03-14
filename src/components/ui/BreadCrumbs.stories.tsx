import BreadCrumbs from "./BreadCrumbs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BreadCrumbs> = {
  title: "COMPONENTS/UI/BreadCrumbs",
  component: BreadCrumbs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "현재 페이지의 위치를 계층 구조로 보여주는 내비게이션 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "브레드크럼 항목 배열",
      control: "object",
    },
    separator: {
      description: "항목 간 구분자",
      control: "text",
    },
    activeLastItem: {
      description: "마지막 항목을 활성화 상태로 표시",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BreadCrumbs>;

// 기본 예제
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Music", href: "/music" },
      { label: "Artist", href: "/music/artist" },
    ],
  },
};

// 더 많은 항목이 있는 예제
export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Music", href: "/music" },
      { label: "Artist", href: "/music/artist" },
      { label: "Album", href: "/music/artist/album" },
      { label: "Song", href: "/music/artist/album/song" },
    ],
  },
};

// 마지막 항목이 활성화된 예제
export const ActiveLastItem: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Music", href: "/music" },
      { label: "Artist", href: "/music/artist" },
      { label: "Album", href: "/music/artist/album" },
      { label: "Song" },
    ],
    activeLastItem: true,
  },
};

// 사용자 정의 구분자 예제
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Music", href: "/music" },
      { label: "Artist", href: "/music/artist" },
    ],
    separator: "/",
  },
};

// 다양한 예제를 한 번에 보여주는 예제
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">기본 브레드크럼</h3>
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: "Artist", href: "/music/artist" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">마지막 항목 활성화</h3>
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: "Artist", href: "/music/artist" },
            { label: "Album" },
          ]}
          activeLastItem
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">긴 경로</h3>
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: "Artist", href: "/music/artist" },
            { label: "Album", href: "/music/artist/album" },
            { label: "Song", href: "/music/artist/album/song" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">사용자 정의 구분자</h3>
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: "Artist", href: "/music/artist" },
          ]}
          separator="/"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">화살표 구분자</h3>
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: "Artist", href: "/music/artist" },
          ]}
          separator="→"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
