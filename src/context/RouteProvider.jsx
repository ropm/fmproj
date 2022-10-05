import axios from "axios";
import React, { useState, createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const RouteContext = createContext(null);

export default function RouteProvider({ children }) {
    const [ownRoutes, setOwnRoutes] = useState([]);
    const [publicRoutes, setPublicRoutes] = useState([]);
    const [routeToCreate, setRouteToCreate] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [newPoints, setNewPoints] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);

    const getOwnRoutes = async () => {
        setRoutesLoading(true);
        try {
            const resp = await axios.get("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route");
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
            console.log(resp);
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
        console.log("adding", point);
        console.log("current new points", newPoints);
        //setNewPoints([...newPoints, point]);
    }

    const saveRoute = async (createdPoints) => {
        setRoutesLoading(true);
        console.log("saving route...");
        const route = routeToCreate;
        route.points = createdPoints;
        route.creator = user;
        route.publicVisibility = false;
        try {
            const resp = await axios.post("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/", route);
            console.log(resp)
            return true;
        } catch (err) {
            console.error("Error with saveRoute", err);
            return false;
        } finally {
            setRoutesLoading(false);
        }
    }
    
    const cancelRouteSave = async () => {
        console.log("canceling saving route...");
        setRouteToCreate({});
        setNewPoints([]);
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
                routesLoading,
                routeToCreate, 
                setRouteToCreate
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}