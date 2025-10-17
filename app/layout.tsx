import type { Metadata } from "next";
import { fontMono, fontSans } from "@/app/fonts/geist";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.dev"),
  title: {
    default: "Portfolio de Nombre Apellido",
    template: "%s | Portfolio de Nombre Apellido",
  },
  description:
    "Portfolio personal moderno con proyectos destacados, experiencia y contacto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
