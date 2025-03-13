import LoginForm from "../_components/LoginForm";
import AuthFooter from "../_components/LoginFormFooter";
import AuthHeader from "../_components/LoginFormHeader";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-50">
      <main className="w-[500px] bg-white p-5xl shadow-md">
        <AuthHeader />
        <LoginForm />
        <AuthFooter />
      </main>
      <footer className="border">© kimdohyeon.</footer>
    </div>
  );
}
