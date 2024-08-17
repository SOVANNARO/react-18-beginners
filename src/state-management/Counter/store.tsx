import { create } from "zustand";

interface CounterStore {
  counter: number;
  increase: () => void;
  reset: () => void;
}

create<CounterStore>((set) => ({
  counter: 0,
  increase: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set({ counter: 0 }),
}));
