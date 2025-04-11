import { create } from "zustand";

interface SettingsStore {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  userSettings: {
    name: string;
    theme: "light" | "dark";
    language: "tr" | "en";
  };
  setUserSettings: (settings: Partial<SettingsStore["userSettings"]>) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  isSettingsOpen: false,
  setIsSettingsOpen: (open) => set({ isSettingsOpen: open }),
  userSettings: {
    name: "Kullanıcı",
    theme: "light",
    language: "tr",
  },
  setUserSettings: (settings) =>
    set((state) => ({
      userSettings: { ...state.userSettings, ...settings },
    })),
})); 