import "./loginform.css";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { signinQuery } from "../../../redux/AuthSlice/signinSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(signinQuery(values));
    navigate("/homepage");
  };

  return (
    <div className="login-container">
      <span className="closebutton" onClick={() => navigate("/auth/signin")}>
        X
      </span>

      <Formik
        initialValues={{
          userId: "",
          password: "",
          role: "employee",
        }}
        validator={() => ({})}
        onSubmit={handleSubmit}
      >
        <Form className="login-form">
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <Field required type="text" id="username" name="userId" />

          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" required />
          <div>
            <div>Signin as</div>
            <div className="usertype">
              <span>Employee</span>
              <Field name="role" type="radio" required value="employee" />
              <span>Manager</span>
              <Field name="role" type="radio" required value="manager" />
            </div>
          </div>
          <div className="submit">
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
