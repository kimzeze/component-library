import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "컴포넌트 라이브러리",
  description: "컴포넌트 라이브러리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <div id="portal-root" />
      </body>
    </html>
  );
}
