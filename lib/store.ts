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

type Configs = any;

interface AppState {
  prompts: Prompts;
  models: Models;
  configs: Configs;
  setPrompts: (prompts: Prompts) => void;
  setModels: (models: Models) => void;
  setConfigs: (configs: Configs) => void;
}

const useAppStore = create<AppState>((set) => ({
  prompts: null,
  models: null,
  configs: null,
  setPrompts: (prompts) => set({ prompts }),
  setModels: (models) => set({ models }),
  setConfigs: (configs) => set({ configs }),
}));

export default useAppStore;
