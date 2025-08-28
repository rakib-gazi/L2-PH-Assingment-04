import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface Modal {
  navbar: boolean;
  addBook: boolean;
  updateBook: boolean;
}
const initialState: Modal = {
  navbar: false,
  addBook: false,
  updateBook: false,
};
const appSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setNavbar: (state, action: PayloadAction<boolean>) => {
      state.navbar = action.payload;
    },
    setAddBook: (state, action: PayloadAction<boolean>) => {
      state.addBook = action.payload;
    },
    setUpdateBook: (state, action: PayloadAction<boolean>) => {
      state.updateBook = action.payload;
    },
  },
});

export const { setNavbar, setAddBook ,setUpdateBook} = appSlice.actions;
export default appSlice.reducer;
