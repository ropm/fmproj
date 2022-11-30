import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [access, setAccess] = useState(null);
    const [user, setUser] = useState(null);
 
const JWT_REFRESH_VALID_BUFFER = 60 * 60; // 1 hour

const JWT_ACCESS_VALID_BUFFER = 5 * 60; // 5 minutes

const IGNORED_PATHS = ["auth/refresh", "login", "heartbeat", "logout", "register, route/public"];

const checkTokenValidDate = (token, refresh) => {
  let valid = false;
  try {
    const decoded = jwt_decode(token);
    const buffer = refresh ? JWT_REFRESH_VALID_BUFFER : JWT_ACCESS_VALID_BUFFER;
    if (decoded) {
      decoded.exp < Date.now() / 1000
        ? (valid = false)
        : (valid = true);
    }
  } catch (err) {
    // InvalidTokenError
    console.error("Error verifying jwt: ", err);
  }
  return valid;
};

const authInterceptor = (unAuthAction) => {
  axios.interceptors.request.use(
    function (config) {
      const { headers, url } = config;
      const splitUrl = url.split("v1/");
      if (url && IGNORED_PATHS.find((item) => item === splitUrl[1])) {
        return config;
      }
      if (headers) {
        const authHeader = headers.common["Authorization"];
        if (!authHeader) {
          return config;
        }
        const access = authHeader.split("Bearer ")[1];
        const refresh = localStorage.getItem("HK_REFRESH");
        // check refresh token validity
        if (!access || !refresh || !checkTokenValidDate(refresh, true)) {
          unAuthAction();
          return config;
        }
        // check if access token is valid
        if (checkTokenValidDate(access, false)) {
          return config;
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${refresh}`;
        // access token is expiring, get a new access token using refresh token
        return axios
          .post(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/auth/refresh`)
          .then((res) => {
            setAccessToken(res.data.access);
            return Promise.resolve(config);
          });
      }

      return config;
    },
    function (error) {
      console.error("Something went wrong getting new tokens");
      return Promise.reject(error);
    }
  );
};

const setAccessToken = (token) => {
    localStorage.setItem("HK_ACCESS", token);
    axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("HK_ACCESS")}`;
}

const unAuth = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("HK_ACCESS");
    localStorage.removeItem("HK_REFRESH");
}

useEffect(() => {
    console.log("interceptor")
    authInterceptor(unAuth);
}, []);

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                setIsAuthenticated,
                access, 
                setAccess,
                setAccessToken,
                user,
                setUser,
                isAdmin,
                setIsAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}