
import Image from "next/image";
import "./globals.css";
import { BottomMenu, SidebarMenu } from "./components/Menu";
import BackgroundGradient from "./components/BackgroundGradient";
import PwaRegister from "./components/PwaRegister";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body
        className={`antialiased flex flex-col`}
      >
      
        <PwaRegister />
        <BackgroundGradient />
        <div className="flex justify-center items-center">
          <Image
            src="/Logo.png"
            alt="Adeel Ali Yousaf Logo"
            width={110}
            height={110}
            className="rounded-full shadow-lg object-contain"
            priority
          />
        </div>
        <SidebarMenu />
        <BottomMenu />
        {children}
      </body>
    </html>
  );
}
