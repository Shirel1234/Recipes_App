import { create } from "zustand";

interface CategoryState {
    category: string;
    updateCategory: (newCategory: string) => void;
}
const useCategoryStore = create<CategoryState>((set) => ({
    category: '', 
    updateCategory: (newCategory: string) => set({ category: newCategory })
}));

interface SearchState {
    searchText: string;
    updateSearchText: (newText: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    searchText: '', 
    updateSearchText: (newText: string) => set({ searchText: newText })
}));

interface FavoriteState {
    isFavorite: boolean;
    updateIsFavorite: (isFav: boolean) => void;
}

const useIsFavoriteStore = create<FavoriteState>((set) => ({
    isFavorite: false, 
    updateIsFavorite: (isFav: boolean) => set({ isFavorite: isFav })
}));

export {useCategoryStore, useSearchStore, useIsFavoriteStore};