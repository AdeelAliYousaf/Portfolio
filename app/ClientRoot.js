"use client";
import CmdTerminalOverlay from "./components/CmdTerminalOverlay";
import Chatbot from "./components/Chatbot/Chatbot";
import PwaRegister from "./components/PwaRegister";
import BackgroundGradient from "./components/BackgroundGradient";

import { SidebarMenu, BottomMenu } from "./components/Menu";
import Image from "next/image";

import { useEffect } from "react";

export default function ClientRoot({ children }) {
  useEffect(() => {
    const logo = document.getElementById("adeel-logo");
    if (logo) {
      logo.onclick = () => {
        if (window.openCmdTerminalOverlay) window.openCmdTerminalOverlay();
      };
    }
    return () => {
      if (logo) logo.onclick = null;
    };
  }, []);

  return (
    <>
      <PwaRegister />
      <BackgroundGradient />
      <div className="flex justify-center items-center">
        <Image
          id="adeel-logo"
          src="/Logo.png"
          alt="Adeel Ali Yousaf Logo"
          width={110}
          height={110}
          className="rounded-full shadow-lg object-contain cursor-pointer h-auto"
          priority
        />
      </div>
      <SidebarMenu />
      <BottomMenu />
      {children}
      <CmdTerminalOverlay />
      <div id="chatbot-anim-wrap">
        <Chatbot />
      </div>
    </>
  );
}
