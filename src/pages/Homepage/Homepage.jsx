import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { removeTokenKeys } from "../../services/AxiosService/tokenMethods";
import HomeOverview from "./HomeOverview/HomeOverview";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeesQuery } from "../../redux/EmployeeSlice/employeeSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let employeeList = useSelector((state) => state.employeeSlice.EmployeesList);
  const signOuthandleClick = () => {
    removeTokenKeys();
    navigate("/");
  };
  const [list, setlist] = useState([]);

  useEffect(() => {
    dispatch(employeesQuery());
  }, []);
  console.log(employeeList);
  return (
    <>
      <div className="AuthHead">
        <h2>Ipangram logo</h2>
        <div className="headleft">
          <button onClick={() => signOuthandleClick()}>Sign out</button>
        </div>
      </div>
      <div className="AuthBody">
        <div>
          <HomeOverview />
        </div>
      </div>
    </>
  );
}
