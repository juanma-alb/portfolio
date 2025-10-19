import type { Metadata } from "next";
import { fontMono, fontSans } from "@/app/fonts/geist";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsWrapper } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { personSchema, projectSchema } from "@/lib/schema";
import { projects } from "@/content/projects";
const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl =
  siteUrlEnv && siteUrlEnv.length > 0
    ? siteUrlEnv
    : "https://portfolio-juan-alb.vercel.app";
const title = `Portfolio de ${profile.name}`;
const description =
  "Portfolio personal moderno con proyectos, experiencia y un enfoque en rendimiento y accesibilidad.";

const twitterHandleEnv = process.env.NEXT_PUBLIC_TWITTER?.replace(/^@/, "") || undefined;
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
    title: "Portfolio de Juan Manuel Albino",
    description:
      "Portfolio personal moderno con proyectos, experiencia y un enfoque en rendimiento y accesibilidad.",
    siteName: "Juan Albino — Portfolio",
    locale: "es_ES",
    images: [
      {
        url: `${siteUrl}/opengraph-image?v=20251019`,
        width: 1200,
        height: 630,
        alt: "Portfolio de Juan Manuel Albino",
      },
    ],
  },
  
   twitter: {
    card: "summary_large_image",
    title: "Portfolio de Juan Manuel Albino",
    description:
      "Portfolio personal moderno con proyectos, experiencia y un enfoque en rendimiento y accesibilidad.",
    images: [`${siteUrl}/opengraph-image?v=20251019`],
    creator: twitterHandleEnv ? `@${twitterHandleEnv}` : undefined,
    site: twitterHandleEnv ? `@${twitterHandleEnv}` : undefined,
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
  const jsonLd = [
    personSchema(siteUrl),
    ...projects.map((p) => projectSchema(p, siteUrl)),
  ];

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
         {/* JSON-LD (SEO): Person + Projects */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <Navbar />
          {children}
          <Footer />
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
