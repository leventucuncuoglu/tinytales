"use client"

import { createContext, useContext, useState } from "react"

type UserSettings = {
  name: string;
  email: string;
  avatar: string;
}

type SettingsContextType = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (open: boolean) => void;
  userSettings: UserSettings;
  setUserSettings: (settings: UserSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "Hikaye Kahramanı",
    email: "kahraman@example.com",
    avatar: "https://ui-avatars.com/api/?name=Hikaye+Kahramani&background=7c3aed&color=fff"
  });

  return (
    <SettingsContext.Provider value={{
      isSettingsOpen,
      setIsSettingsOpen,
      isPasswordModalOpen,
      setIsPasswordModalOpen,
      userSettings,
      setUserSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
} 