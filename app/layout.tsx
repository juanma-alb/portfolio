import type { Metadata } from "next";
import { fontMono, fontSans } from "@/app/fonts/geist";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsWrapper } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";
import "./globals.css";

const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = siteUrlEnv && siteUrlEnv.length > 0 ? siteUrlEnv : "https://portfolio.dev";
const title = `Portfolio de ${profile.name}`;
const description =
  "Portfolio personal moderno con proyectos, experiencia y un enfoque en rendimiento y accesibilidad.";
const twitterHandle = profile.socials
  .find((social) => social.label.toLowerCase() === "x")?.url
  ?.split("/")
  .filter(Boolean)
  .pop();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  keywords: [
    "Desarrollador web",
    "Frontend",
    "Next.js",
    profile.role,
    "Portfolio",
    "React",
    "TypeScript",
  ],
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: title,
    locale: "es_ES",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: twitterHandle ? `@${twitterHandle}` : undefined,
    site: twitterHandle ? `@${twitterHandle}` : undefined,
    images: [`${siteUrl}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <a href="#main" className="sr-only focus:not-sr-only">
          Saltar al contenido
        </a>
        <ThemeProvider storageKey="portfolio-theme">
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
