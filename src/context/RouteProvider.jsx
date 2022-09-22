import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const RouteContext = createContext(null);

export default function RouteProvider({ children }) {
    const [ownRoutes, setOwnRoutes] = useState([]);
    const [publicRoutes, setPublicRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newPoints, setNewPoints] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(false);

    const getOwnRoutes = async () => {
        setRoutesLoading(true);
        try {
            const resp = await axios.get("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/public"); // TODO: poista "/public" kun testattu
            if (resp.data) {
                setOwnRoutes(resp.data);
            }
        } catch (err) {
            console.error("Error with getOwnRoutes", err);
        } finally {
            setRoutesLoading(false);
        }
    }

    const getPublicRoutes = async () => {
        setRoutesLoading(true);
        try {
            const resp = await axios.get("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/public");
            if (resp.data) {
                setPublicRoutes(resp.data);
            }
        } catch (err) {
            console.error("Error with getPublicRoutes", err);
        } finally {
            setRoutesLoading(false);
        }
    }

    const getAllRoutes = async () => {
        const ownOk = await getOwnRoutes();
        const pubOk = await getPublicRoutes();
    }

    const createPoint = (point) => {
        point.orderNo = newPoints.length + 1;
        setNewPoints([...newPoints, point]);
    }

    const saveRoute = async () => {
        console.log("saving route...")
    }
    
    const cancelRouteSave = async () => {
        console.log("canceling saving route...")
    }

    return (
        <RouteContext.Provider 
            value={{
                ownRoutes,
                publicRoutes,
                getOwnRoutes,
                getPublicRoutes,
                getAllRoutes,
                createPoint,
                saveRoute,
                cancelRouteSave,
                routesLoading
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}