import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}