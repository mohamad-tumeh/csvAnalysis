import create from 'zustand';

interface DataState {
  csvData: any[];
  analysis: string;
  chatResponses: string[];
  setCsvData: (data: any[]) => void;
  setAnalysis: (analysis: string) => void;
  addChatResponse: (response: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  csvData: [],
  analysis: '',
  chatResponses: [],
  setCsvData: (data) => set({ csvData: data }),
  setAnalysis: (analysis) => set({ analysis }),
  addChatResponse: (response) =>
    set((state) => ({ chatResponses: [...state.chatResponses, response] })),
}));
