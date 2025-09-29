import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { QueryProvider } from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./providers";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sapiow",
  description: "Sapiow",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${figtree.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Provider locale={locale}>
            <FavoritesProvider>{children}</FavoritesProvider>
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
