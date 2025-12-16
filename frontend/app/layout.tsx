import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GreenProof 🌱 Prove Impact Without Exposure",
  description: "Privacy-preserving environmental impact tracking powered by FHE. Record verified eco-data in encrypted form with blockchain verification.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {/* 背景装饰 */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* 渐变背景 */}
            <div className="absolute inset-0 gradient-hero" />
            
            {/* 装饰圆形 */}
            <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/10 blur-3xl animate-float-slow" />
            <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-lime-400/15 to-green-500/10 blur-3xl animate-float-slow delay-200" />
            <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-300/15 to-teal-500/10 blur-3xl animate-float-slow delay-400" />
            
            {/* 网格背景 */}
            <div className="absolute inset-0 bg-grid opacity-50" />
          </div>

          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
