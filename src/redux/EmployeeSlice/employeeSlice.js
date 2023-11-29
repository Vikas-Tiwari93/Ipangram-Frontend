import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/AxiosService/AxiosInstance";
let initialState = {
  EmployeesList: [],
  isLoadingSignin: false,
};
export const employeesQuery = createAsyncThunk("employeesQuery", async () => {
  return getRequest(`/employee/list`, {
    isAuth: true,
    isJson: true,
  });
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
        let actudalData = JSON.parse(action.payload.data);
        state.EmployeesList = [{ ...actudalData }];
        state.isLoadingSignin = false;
      }),
      builder.addCase(employeesQuery.rejected, (state) => {
        state.isLoadingSignin = false;
      });
  },
});

export default employeeSlice.reducer;
