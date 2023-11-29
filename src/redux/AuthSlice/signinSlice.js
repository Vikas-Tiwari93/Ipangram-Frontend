import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../services/AxiosService/AxiosInstance";
import { setTokenkeys } from "../../services/AxiosService/tokenMethods";
let initialState = {
  isLoadingSignin: false,
};
export const signinQuery = createAsyncThunk("signinQuery", async (data) => {
  const fetch = await postRequest(`/auth/signin`, JSON.stringify(data), {
    isAuth: false,
    isJson: true,
  });
  return fetch.data;
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
        const { authToken, refreshToken } = JSON.parse(action.payload);
        setTokenkeys(authToken, refreshToken);

        state.isLoadingSignin = false;
      }),
      builder.addCase(signinQuery.rejected, (state) => {
        state.isLoadingSignin = false;
      });
  },
});

export default signinSlice.reducer;
