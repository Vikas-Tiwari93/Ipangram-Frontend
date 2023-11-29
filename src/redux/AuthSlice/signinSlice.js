import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../services/AxiosService/AxiosInstance";
let initialState = {
  isLoadingSignin: false,
};
export const signinQuery = createAsyncThunk("signinQuery", async (data) => {
  return postRequest(`/auth/signin`, JSON.stringify(data), {
    isAuth: false,
    isJson: true,
  });
});
const signinSlice = createSlice({
  name: "signinSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinQuery.pending, (state) => {
      state.isLoadingSignin = true;
    }),
      builder.addCase(signinQuery.fulfilled, (state, action) => {
        state.loginObj = { ...action.payload.results };
        state.isLoadingSignin = false;
      }),
      builder.addCase(signinQuery.rejected, (state) => {
        state.isLoadingSignin = false;
      });
  },
});

export default signinSlice.reducer;
