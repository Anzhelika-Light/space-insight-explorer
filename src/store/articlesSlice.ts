import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../types/article";

interface SpaceflightResponse {
  results: Article[];
  count: number;
}

interface ArticlesState {
  items: Article[];
  searchQuery: string;
  totalCount: number;
}

const initialState: ArticlesState = {
  items: [],
  searchQuery: "",
  totalCount: 0,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<SpaceflightResponse>) => {
      state.items = action.payload.results;
      state.totalCount = action.payload.count;
    },
    addArticles: (state, action: PayloadAction<SpaceflightResponse>) => {
      state.items = [...state.items, ...action.payload.results];
      state.totalCount = action.payload.count;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setArticles, addArticles, setSearchQuery } =
  articlesSlice.actions;
export default articlesSlice.reducer;
