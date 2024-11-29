import { create } from 'zustand';

type EventHistoryState = {
  eventIds: number[];
};

type EventHistoryAction = {
  addEvent: (id: number) => void;
  deleteLastEvent: () => void;
};

export const useEventStore = create<EventHistoryState & EventHistoryAction>(
  (set) => ({
    eventIds: [],
    addEvent: (id: number) =>
      set((state) => ({ eventIds: [...state.eventIds, id] })),
    deleteLastEvent: () =>
      set((state) => ({ eventIds: state.eventIds.slice(0, -1) })),
  }),
);

type State = {
  editorSelectedGame: string;
  editorSelectedGameQuestion: string;
  editorSelectedFromAllQuestions: string;
};

type Action = {
  updateEditorSelectedGame: (selectedGame: State['editorSelectedGame']) => void;
  updateEditorSelectedGameQuestion: (
    selected: State['editorSelectedGameQuestion'],
  ) => void;
  updateEditorSelectedFromAllQuestions: (
    selected: State['editorSelectedFromAllQuestions'],
  ) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  editorSelectedGame: '',
  editorSelectedGameQuestion: '',
  editorSelectedFromAllQuestions: '',
  updateEditorSelectedGame: (selected: string) =>
    set(() => ({ editorSelectedGame: selected })),
  updateEditorSelectedGameQuestion: (selected: string) =>
    set(() => ({ editorSelectedGameQuestion: selected })),
  updateEditorSelectedFromAllQuestions: (selected: string) =>
    set(() => ({ editorSelectedFromAllQuestions: selected })),
}));
