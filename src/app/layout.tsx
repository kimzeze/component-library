import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "앱티핏 대시보드",
  description: "앱티핏 서비스를 이용하는 교사들을 위한 학생 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
