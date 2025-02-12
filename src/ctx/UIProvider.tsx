import { createContext, useContext, useState } from 'react';

type UI = {
  isWritingPrompt: boolean;
  setIsWritingPrompt: (isWritingPrompt: boolean) => void;
};

const UIContext = createContext<UI>({} as UI);

export function UIProvider({ children }: any) {
  const [isWritingPrompt, setIsWritingPrompt] = useState(false);

  const value = {
    isWritingPrompt,
    setIsWritingPrompt,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const UIConsumer = UIContext.Consumer;

export function useUI() {
  return useContext(UIContext);
}
