import { createContext, useContext, useState, ReactNode } from 'react';

interface NyanContextType {
  isNyanMode: boolean;
  toggleNyanMode: () => void;
}

const NyanContext = createContext<NyanContextType | undefined>(undefined);

export const useNyan = () => {
  const context = useContext(NyanContext);
  if (!context) {
    throw new Error('useNyan must be used within NyanProvider');
  }
  return context;
};

export const NyanProvider = ({ children }: { children: ReactNode }) => {
  const [isNyanMode, setIsNyanMode] = useState(false);

  const toggleNyanMode = () => {
    setIsNyanMode(prev => !prev);
  };

  return (
    <NyanContext.Provider value={{ isNyanMode, toggleNyanMode }}>
      {children}
    </NyanContext.Provider>
  );
};
