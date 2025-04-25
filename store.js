import create from 'zustand';

const useStore = create((set) => ({
  outfit: [],
  addToOutfit: (item) => set((state) => ({ outfit: [...state.outfit, item] })),
  clearOutfit: () => set({ outfit: [] }),
}));

export default useStore;