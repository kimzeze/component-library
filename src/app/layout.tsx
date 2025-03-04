import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹사이트 이름",
  description: "웹사이트 설명을 입력하세요",
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
