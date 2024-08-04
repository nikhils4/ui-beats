"use client";
import { createContext, ReactNode, useContext } from "react";

type WebsiteContextType = {};

const WebsiteContext = createContext<WebsiteContextType>({});

export const WebsiteContextProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <WebsiteContext.Provider value={{}}>{children}</WebsiteContext.Provider>
  );
};

export const useWebsiteContext = () => {
  const context = useContext(WebsiteContext);

  if (!context) {
    throw new Error(
      "useWebsiteContext must be used within a WebsiteContextProvider",
    );
  }

  return context;
};
