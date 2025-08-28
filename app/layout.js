import Image from "next/image";
import "./globals.css";

import { BottomMenu, SidebarMenu } from "./components/Menu";
import BackgroundGradient from "./components/BackgroundGradient";
import PwaRegister from "./components/PwaRegister";


import Chatbot from "./components/Chatbot/Chatbot";
import CmdTerminalOverlay from "./components/CmdTerminalOverlay";

export default function RootLayout({children})
{
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html:`
          window.addEventListener('DOMContentLoaded',function(){
            setTimeout(function(){
              var el=document.getElementById('chatbot-anim-wrap');
              if(el){el.classList.remove('opacity-0','pointer-events-none');el.classList.add('opacity-100');}
            },9000);
            var logo = document.getElementById('adeel-logo');
            if(logo){
              logo.addEventListener('click',function(){
                if(window.openCmdTerminalOverlay) window.openCmdTerminalOverlay();
              });
            }
            var closeBtn = document.getElementById('cmd-terminal-close');
            if(closeBtn){
              closeBtn.addEventListener('click',function(){
                if(window.closeCmdTerminalOverlay) window.closeCmdTerminalOverlay();
              });
            }
          });
        `}} />
      </head>
      <body className="antialiased flex flex-col">
        <PwaRegister />
        <BackgroundGradient />
        <div className="flex justify-center items-center">
          <Image
            id="adeel-logo"
            src="/Logo.png"
            alt="Adeel Ali Yousaf Logo"
            width={110}
            height={110}
            className="rounded-full shadow-lg object-contain cursor-pointer"
            priority
          />
        </div>
        <SidebarMenu />
        <BottomMenu />
        {children}
          <CmdTerminalOverlay />

        <div id="chatbot-anim-wrap" className="opacity-0 pointer-events-none transition-opacity duration-700 delay-100">
          <Chatbot />
        </div>
      </body>
    </html>
  );
}