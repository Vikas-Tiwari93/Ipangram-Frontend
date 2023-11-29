import { Navigate, createBrowserRouter } from "react-router-dom";
import Checkauth from "../components/auth/Checkauth";
import Homepage from "../pages/Homepage/Homepage";
import Manager from "../pages/Manager/Manager";
import Employee from "../pages/Employee/Employee";
import Signin from "../pages/Auth/Signin";
import LoginForm from "../pages/Auth/LogininForm/LoginForm";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Checkauth>
        <Navigate to="/homepage" />
      </Checkauth>
    ),
    errorElement: <p> some error Occured while parsing the page</p>,
  },
  {
    path: "/auth/signin",
    element: <Signin />,
    children: [
      {
        path: "loginform",
        element: <LoginForm />,
        errorElement: <p> some error Occured while parsing the page</p>,
      },
    ],
  },
  {
    path: "/homepage",
    element: (
      <Checkauth>
        <Homepage />
      </Checkauth>
    ),
    children: [
      {
        path: "manager",
        element: <Manager />,
        errorElement: <p> some error Occured while parsing the page</p>,
      },
      {
        path: "employee",
        element: <Employee />,
        errorElement: <p> some error Occured while parsing the page</p>,
      },
    ],
  },
  {
    path: "*",
    element: <p> this page doesnot exist</p>,
  },
]);
