import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [access, setAccess] = useState(null);

axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("HK_ACCESS")}`;
    
const JWT_REFRESH_VALID_BUFFER = 60 * 60; // 1 hour

const JWT_ACCESS_VALID_BUFFER = 5 * 60; // 5 minutes

const IGNORED_PATHS = ["refresh", "login", "heartbeat", "logout"];

const checkTokenValidDate = (token, refresh) => {
  let valid = false;
  try {
    const decoded = jwt_decode(token);
    const buffer = refresh ? JWT_REFRESH_VALID_BUFFER : JWT_ACCESS_VALID_BUFFER;
    if (decoded) {
      decoded.exp - buffer < Date.now() / 1000
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
      if (url && IGNORED_PATHS.find((item) => item === url)) {
        return config;
      }
      if (headers) {
        const access = headers.common["Authorization"].split("Bearer ")[1];
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
        const refreshConf = {
          headers: { Authorization: `Bearer ${refresh}` },
        };
        // access token is expiring, get a new access token using refresh token
        return axios
          .post(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/refresh`, refreshConf)
          .then((res) => {
            // @ts-ignore
            headers.common["Authorization"] = `Bearer ${res.data.access}`;
            localStorage.setItem("HK_ACCESS", res.data.access);
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

    const unAuth = () => {
        setIsAuthenticated(false);
    }

    useEffect(() => {
        authInterceptor(unAuth);
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                setIsAuthenticated,
                access, 
                setAccess
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}