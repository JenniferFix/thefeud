import { create } from 'zustand';

type State = {
  selectedGame: string;
};

type Action = {
  updateSelectedGame: (selectedGame: State['selectedGame']) => void;
};

export const useFeudStore = create<State & Action>((set) => ({
  selectedGame: '',
  updateSelectedGame: (selectedGame: string) => set(() => ({ selectedGame })),
}));
