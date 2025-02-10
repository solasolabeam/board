import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "게시판 웹",
  description: "BIGS 프론트엔드 개발자 채용 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
