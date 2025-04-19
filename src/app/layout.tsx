import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <main className="font-book-regular flex-1 container p-4 mx-auto max-w-3xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
