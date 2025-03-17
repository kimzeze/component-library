import { LoginForm, LoginFormFooter, LoginFormHeader } from "../_components";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-50">
      <main className="w-[500px] rounded-lg bg-white p-5xl shadow-md">
        <LoginFormHeader />
        <LoginForm />
        <LoginFormFooter />
      </main>
      <footer className="border">© kimdohyeon.</footer>
    </div>
  );
}
