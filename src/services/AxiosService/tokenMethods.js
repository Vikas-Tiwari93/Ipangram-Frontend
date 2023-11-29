export const getAuthTokenkey = () => {
  return localStorage.getItem("authToken");
};
export const getRefreshTokenkey = () => {
  return localStorage.getItem("refreshToken");
};
export const setTokenkeys = (refreshToken, authToken) => {
  localStorage.setItem("authToken", `Bearer ${authToken}`);
  localStorage.setItem("refreshToken", `${refreshToken}`);
};
export const removeTokenKeys = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};
export const setAuthTokenkey = (authToken) => {
  localStorage.setItem("authToken", `Bearer${authToken}`);
};
