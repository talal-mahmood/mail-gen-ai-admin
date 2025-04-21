import { create } from 'zustand';

type Prompts = any;
// {
//   id: string;
//   text: string;
// };

type Models = any;
// {
//   id: string;
//   name: string;
// };

interface AppState {
  prompts: Prompts;
  models: Models;
  setPrompts: (prompts: Prompts) => void;
  setModels: (models: Models) => void;
}

const useAppStore = create<AppState>((set) => ({
  prompts: null,
  models: null,
  setPrompts: (prompts) => set({ prompts }),
  setModels: (models) => set({ models }),
}));

export default useAppStore;
