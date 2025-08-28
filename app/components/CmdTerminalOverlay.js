"use client";
import React, { useState, useCallback } from "react";
import CmdTerminal from "./CmdTerminal";

export default function CmdTerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);

  // Expose openTerminal globally for logo click
  React.useEffect(() => {
    window.openCmdTerminalOverlay = () => {
      setKey(k => k + 1);
      setOpen(true);
    };
    window.closeCmdTerminalOverlay = () => setOpen(false);
    return () => {
      delete window.openCmdTerminalOverlay;
      delete window.closeCmdTerminalOverlay;
    };
  }, []);

  if (!open) return null;
  return (
    <div id="cmd-terminal-overlay" style={{display:'flex',position:'fixed',inset:0,zIndex:99999,background:'rgba(0,0,0,0.9)',alignItems:'center',justifyContent:'center'}}>
      <CmdTerminal key={key} onClose={()=>setOpen(false)} />
    </div>
  );
}
