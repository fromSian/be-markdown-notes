import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SaveState = {
  saveList: (string | number)[];
};

const initialState: SaveState = {
  saveList: [],
};
export const saveState = createSlice({
  name: "save",
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<string | number>) => {
      return {
        saveList: [...state.saveList, action.payload],
      };
    },
    removeOne: (state, action: PayloadAction<string | number>) => {
      return {
        saveList: state.saveList.filter((item) => item != action.payload),
      };
    },
  },
});

export const { addOne, removeOne } = saveState.actions;
export default saveState.reducer;
