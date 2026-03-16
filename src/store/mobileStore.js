import { create } from "zustand";

const useMobileStore = create((set) => ({
    activeApp: null,
    openApp: (id) => set({ activeApp: id }),
    closeApp: () => set({ activeApp: null }),
}));

export default useMobileStore;
