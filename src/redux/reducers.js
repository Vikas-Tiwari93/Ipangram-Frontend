import { combineReducers } from "@reduxjs/toolkit";
// import managerReducer from "./ManagerSlice/managerSlice";
import employeeSlice from "./EmployeeSlice/employeeSlice";
import signinSlice from "./AuthSlice/signinSlice";

const rootReducer = combineReducers({
  // managerReducer: managerReducer,
  employeeSlice: employeeSlice,
  signinSlice: signinSlice,
});

export default rootReducer;
