import { LinkButton } from "@/components/ui";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center p-6">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">라우터 테스트 페이지</h1>
        <p className="text-lg text-gray-600">아래 버튼을 클릭하여 다른 페이지로 이동하세요.</p>
      </header>

      <div className="flex w-full max-w-md flex-col gap-4">
        <LinkButton href="/login" fullWidth>
          로그인 페이지로 이동
        </LinkButton>

        <LinkButton href="/modal" fullWidth>
          모달 페이지로 이동
        </LinkButton>
      </div>
    </main>
  );
}
