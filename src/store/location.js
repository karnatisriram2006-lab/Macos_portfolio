import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {locations} from "#constants";
const DEFAULT_LOCATION=locations.work;
const useLocationStore=create(immer((set)=>({
    activeLocation: DEFAULT_LOCATION,
    viewType: "grid",
    history: [DEFAULT_LOCATION],
    setActiveLocation: (location) => set((state) => {
        if (!location) return;
        state.activeLocation = location;
        // Simple breadcrumb logic: if the location is in the chain, truncate history to it
        // For simplicity, we'll just push to history if it's a child
        const index = state.history.findIndex(h => h.id === location.id);
        if (index !== -1) {
            state.history = state.history.slice(0, index + 1);
        } else {
            state.history.push(location);
        }
    }),
    setViewType: (type) => set((state) => {
        state.viewType = type;
    }),
    resetActiveLocation: () => set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
        state.history = [DEFAULT_LOCATION];
    }),
})));
export default useLocationStore;