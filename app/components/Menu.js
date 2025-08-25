"use client";
import { Home, GraduationCap, BadgeCheck, FolderKanban, Handshake, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Education", icon: GraduationCap, href: "/education" },
  { name: "Certifications", icon: BadgeCheck, href: "/certification" },
  { name: "Download CV", icon: Download, href: "/Portfolio/AdeelAliYousafResume2025.pdf", download: true },
  { name: "Projects", icon: FolderKanban, href: "/project" },
  { name: "Services", icon: Handshake, href: "/service" },
  { name: "Contact me", icon: Mail, href: "/contact" },
];

export function BottomMenu() {
  const pathname = usePathname();
  const active = menuItems.findIndex((item) => item.href === pathname);
  return (
  <div className="fixed bottom-4 left-0 right-0 max-h-[4.4rem] px-2 rounded-t-2xl shadow-2xl z-50 md:hidden w-full max-w-full">
      <ul className="flex items-center justify-center min-w-[340px] bg-white/10 backdrop-blur-2xl rounded-full border border-blue-200/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative">
        {menuItems.map((menu, i) => (
          <li key={i} className="w-16 flex items-center justify-center relative">
            {active === i && (
              <motion.span
                layoutId="bottommenu-active-bg"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 shadow-lg z-0"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            {menu.download ? (
              <button
                className="w-full h-16 flex items-center justify-center z-10"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = menu.href;
                  link.download = '';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                aria-label={menu.name}
                type="button"
              >
                <motion.span
                  className={`text-xl cursor-pointer duration-300 flex items-center justify-center rounded-full ${active === i ? "text-white" : "text-white/50"}`}
                  style={{ width: 40, height: 40 }}
                  animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <menu.icon size={24} />
                </motion.span>
              </button>
            ) : (
              <Link href={menu.href} className="w-full h-16 flex items-center justify-center z-10">
                <motion.span
                  className={`text-xl cursor-pointer duration-300 flex items-center justify-center rounded-full ${active === i ? "text-white" : "text-white/50"}`}
                  style={{ width: 40, height: 40 }}
                  animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <menu.icon size={24} />
                </motion.span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SidebarMenu() {
  const pathname = usePathname();
  const active = menuItems.findIndex((item) => item.href === pathname);
  return (
    <aside className="hidden md:fixed md:left-6 md:top-6 md:bottom-6 md:flex md:flex-col md:items-center md:justify-center bg-white/20 backdrop-blur-2xl rounded-3xl border border-blue-200/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-50 p-2 gap-2 w-20 h-auto overflow-hidden">
      <ul className="flex flex-col items-center justify-between grow w-full h-full relative">
        {menuItems.map((menu, i) => (
          <li key={menu.name} className="w-full flex items-center justify-center relative">
            {active === i && (
              <motion.span
                layoutId="sidebar-active-bg"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 shadow-lg z-0"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            {menu.download ? (
              <button
                className="w-12 h-12 flex items-center justify-center z-10"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = menu.href;
                  link.download = '';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                aria-label={menu.name}
                type="button"
              >
                <motion.span
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${active === i ? "text-white" : "text-gray-500"}`}
                  animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {menu.icon && <menu.icon size={24} />}
                </motion.span>
              </button>
            ) : (
              <Link href={menu.href} className="w-12 h-12 flex items-center justify-center z-10">
                <motion.span
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${active === i ? "text-white" : "text-gray-500"}`}
                  animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {menu.icon && <menu.icon size={24} />}
                </motion.span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
