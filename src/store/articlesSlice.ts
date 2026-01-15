import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../types/article";

interface SpaceflightResponse {
  results: Article[];
  count: number;
}

interface ArticlesState {
  items: Article[];
  searchQuery: string;
}

const initialState: ArticlesState = {
  items: [],
  searchQuery: "",
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<SpaceflightResponse>) => {
      state.items = action.payload.results;
      //   state.totalCount = action.payload.count;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setArticles, setSearchQuery } = articlesSlice.actions;
export default articlesSlice.reducer;
