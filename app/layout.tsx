import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUD Discord",
  description: "Trabalho de Banco de Dados - Discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
