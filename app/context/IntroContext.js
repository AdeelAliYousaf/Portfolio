"use client";
import { createContext, useContext, useState } from "react";

const IntroContext = createContext();

export function IntroProvider({ children }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);



  return (
    <IntroContext.Provider value={{ isIntroComplete, setIsIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}