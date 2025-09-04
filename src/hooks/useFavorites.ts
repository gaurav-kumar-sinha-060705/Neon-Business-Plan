import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  isItemFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getTotalFavorites: () => number;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return state; // Already in favorites
        }
        return {
          items: [...state.items, item]
        };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      isItemFavorite: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      clearFavorites: () => set({ items: [] }),
      
      getTotalFavorites: () => {
        return get().items.length;
      }
    }),
    {
      name: 'neon-favorites-storage',
    }
  )
);