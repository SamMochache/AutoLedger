import { create } from 'zustand';
import { Transaction, Workspace } from '../types';
import {
  generateMockTransactions,
  generateMockWorkspaces } from
'../utils/mockData';

interface AppState {
  transactions: Transaction[];
  workspaces: Workspace[];
  isLoading: boolean;
  error: string | null;
  selectedWorkspace: string | null;
  sidebarOpen: boolean;
  darkMode: boolean;

  // Actions
  fetchTransactions: () => Promise<void>;
  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (
  workspace: Omit<Workspace, 'id' | 'createdAt' | 'transactionCount'>)
  => Promise<void>;
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setSelectedWorkspace: (id: string | null) => void;
}

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useStore = create<AppState>((set, get) => ({
  transactions: [],
  workspaces: [],
  isLoading: false,
  error: null,
  selectedWorkspace: null,
  sidebarOpen: false,
  darkMode:
  localStorage.getItem('theme') === 'dark' ||
  !('theme' in localStorage) &&
  window.matchMedia('(prefers-color-scheme: dark)').matches,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      await delay(800); // Simulate network
      const data = generateMockTransactions(45);
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch transactions', isLoading: false });
    }
  },

  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      await delay(600);
      const data = generateMockWorkspaces();
      set({ workspaces: data, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch workspaces', isLoading: false });
    }
  },

  createWorkspace: async (workspaceData) => {
    set({ isLoading: true, error: null });
    try {
      await delay(1000);
      const newWorkspace: Workspace = {
        ...workspaceData,
        id: `ws_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        transactionCount: 0
      };
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        isLoading: false
      }));
    } catch (err) {
      set({ error: 'Failed to create workspace', isLoading: false });
    }
  },

  updateWorkspace: async (id, workspaceData) => {
    set({ isLoading: true, error: null });
    try {
      await delay(800);
      set((state) => ({
        workspaces: state.workspaces.map((ws) =>
        ws.id === id ? { ...ws, ...workspaceData } : ws
        ),
        isLoading: false
      }));
    } catch (err) {
      set({ error: 'Failed to update workspace', isLoading: false });
    }
  },

  deleteWorkspace: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await delay(800);
      set((state) => ({
        workspaces: state.workspaces.filter((ws) => ws.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: 'Failed to delete workspace', isLoading: false });
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleDarkMode: () =>
  set((state) => {
    const newDarkMode = !state.darkMode;
    if (newDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: newDarkMode };
  }),
  setSelectedWorkspace: (id) => set({ selectedWorkspace: id })
}));