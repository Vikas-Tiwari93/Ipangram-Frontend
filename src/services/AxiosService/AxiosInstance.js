import axios from "axios";
import {
  getAuthTokenkey,
  getRefreshTokenkey,
  removeTokenKeys,
  setAuthTokenkey,
} from "./tokenMethods";

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

export const APIClient = axios.create({
  baseURL: baseUrl || "",
  transformRequest: [],
  transformResponse: [],
});

const expireSession = (err) => {
  if (err) {
    removeTokenKeys();
    window.location.replace(
      `${import.meta.env.VITE_REACT_APP_AUTH_APP_BASE_URL}/auth/signin`
    );
  }
};

const apiCallsWithExpiredTokens = (err) => {
  if (err.response.data.details === "Expired or Invalid token") {
    const refreshToken = getRefreshTokenkey();
    if (!refreshToken) {
      window.location.replace(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/auth/signin`
      );
      throw err.response.data.details;
    }
    const requestedPromise = axios
      .post(`${baseUrl}/auth/refresh`, { refreshToken })
      .then((data) => {
        const { authToken } = data.data;
        return setAuthTokenkey(authToken);
      })
      .catch(expireSession);
    return requestedPromise
      .then(() => {
        const authToken = getAuthTokenkey();
        err.config.headers.Authorization = `Bearer ${authToken}`;
        return axios(err.config);
      })

      .catch((error) => {
        throw error;
      });
  }
  throw err;
};

APIClient.interceptors.response.use(undefined, apiCallsWithExpiredTokens);

export const getRequest = async (url, options) => {
  const headers = {};
  if (options?.isAuth) {
    headers.Authorization = getAuthTokenkey();
  }
  if (options?.contentType) {
    headers["Content-Type"] = options.contentType;
  }
  if (options?.cookie) {
    headers["Cookie"] = options.cookie;
  }

  return APIClient.get(url, { headers });
};

export const postRequest = async (url, data, options) => {
  const headers = {};
  if (options?.isAuth) {
    headers.Authorization = getAuthTokenkey();
  }

  if (options?.isJson) {
    headers["Content-Type"] = "application/json";
  }

  if (options?.formData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (options?.cookie) {
    headers["Cookie"] = options.cookie;
  }

  return APIClient.post(url, data, { headers });
};

export const putRequest = async (url, data, options) => {
  const headers = {};
  if (options?.isAuth) {
    headers.Authorization = getAuthTokenkey();
  }
  if (options?.contentType) {
    headers["Content-Type"] = options.contentType;
  }
  if (options?.formData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (options?.cookie) {
    headers["Cookie"] = options.cookie;
  }

  return APIClient.put(url, data, { headers });
};
export const patchRequest = async (url, data, options) => {
  const headers = {};
  if (options?.isAuth) {
    headers.Authorization = getAuthTokenkey();
  }

  return APIClient.patch(url, data, { headers });
};

export const deleteRequest = async (url, options) => {
  const headers = {};
  if (options?.isAuth) {
    headers.Authorization = getAuthTokenkey();
  }

  return APIClient.delete(url, {
    headers,
  });
};
