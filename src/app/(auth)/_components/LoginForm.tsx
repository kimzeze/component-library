"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

// 타입 정의
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
    clearErrors,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // 값 변경 시 유효성 검사 실행
    reValidateMode: "onChange", // 값 변경 시 재검증
  });

  // 필드 초기화 핸들러
  const handleResetField = (fieldName: keyof LoginFormValues) => {
    resetField(fieldName);
    clearErrors(fieldName); // 에러 상태도 함께 초기화
  };

  const onSubmit = async (data: LoginFormValues) => {
    // 서버 요청을 시뮬레이션하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data);

    // 로그인 처리 로직 구현
    // TODO: API 호출 및 인증 로직 구현
  };

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        type="email"
        label="이메일"
        placeholder="이메일을 입력하세요"
        {...register("email")}
        error={errors.email?.message}
        required
        onClear={() => handleResetField("email")}
      />

      <PasswordInput
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        {...register("password")}
        error={errors.password?.message}
        required
        onClear={() => handleResetField("password")}
      />

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
};

export default LoginForm;
