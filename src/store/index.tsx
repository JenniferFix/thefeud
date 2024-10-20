import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

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

type AuthState = {
  session: Session | null;
  user: User | null;
};

type AuthAction = {
  updateSession: (session: AuthState['session']) => void;
  updateUser: (user: AuthState['user']) => void;
};

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  session: null,
  user: null,
  updateSession: (s: AuthState['session']) => set(() => ({ session: s })),
  updateUser: (u: AuthState['user']) => set(() => ({ user: u })),
}));
