import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/AxiosService/AxiosInstance";
let initialState = {
  EmployeesList: [],
  isLoadingSignin: false,
};
export const employeesQuery = createAsyncThunk("employeesQuery", async () => {
  const fetch = await getRequest(`/employee/list`, {
    isAuth: true,
  });
  return fetch.data;
});
const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(employeesQuery.pending, (state) => {
      state.isLoadingSignin = true;
    }),
      builder.addCase(employeesQuery.fulfilled, (state, action) => {
        state.EmployeesList = [{ ...JSON.parse(action.payload) }];
        console.log(JSON.parse(action.payload));
        state.isLoadingSignin = false;
      }),
      builder.addCase(employeesQuery.rejected, (state) => {
        state.isLoadingSignin = false;
      });
  },
});

export default employeeSlice.reducer;
