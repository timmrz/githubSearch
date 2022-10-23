import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepoCardInfo } from "../../models/models";
import { store } from "../store";

const LS_FAV_KEY = "rfk";

interface IGithubState {
  favorites: IRepoCardInfo[];
}

const initialState: IGithubState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IRepoCardInfo>) {
      state.favorites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },

    removeFavorite(state, action: PayloadAction<IRepoCardInfo>) {
      state.favorites = state.favorites.filter(
        (item) => item.html_url !== action.payload.html_url
      );

      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export default githubSlice.reducer;
export const githubActions = githubSlice.actions;
