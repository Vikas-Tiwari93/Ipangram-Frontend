export default function Checkauth({ children }) {
  const authToken = localStorage.getItem("authToken") || "";
  if (!authToken) {
    window.location.replace(
      `${
        import.meta.env.VITE_REACT_APP_AUTH_APP_BASE_URL
      }/auth/signin/loginform`
    );
  }

  return <div>{authToken ? children : <p> you are being logged out</p>}</div>;
}
