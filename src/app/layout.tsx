import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maxitect Blog",
  description:
    "Max is a former architect turned software engineer. He blogs about topics related to computational design, software, data science and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"scroll-smooth antialiased flex flex-col min-h-screen"}>
        <Header />
        <main className="font-book-regular flex-1 container p-4 mx-auto w-[85vw] max-w-3xl">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
