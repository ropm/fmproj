import axios from "axios";
import React, { useState, createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const RouteContext = createContext(null);

export default function RouteProvider({ children }) {
    const [ownRoutes, setOwnRoutes] = useState([]);
    const [publicRoutes, setPublicRoutes] = useState([]);
    const [publishedRoutes, setPublishedRoutes] = useState([]);
    const [unPublishedRoutes, setUnPublishedRoutes] = useState([]);
    const [routeToCreate, setRouteToCreate] = useState({});
    const [pointToCreate, setPointToCreate] = useState({});
    const [newPoints, setNewPoints] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(AuthContext);

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
            setRefresh(false);
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
            setRefresh(false);
        }
    }

    const getAdminRoutes = async () => {
        setRoutesLoading(true);
        try {
            const resp = await axios.get("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/admin");
            console.log(resp);
            if (resp.data) {
                const published = resp.data.filter(route => route.published);
                const unPublished = resp.data.filter(route => !route.published);
                setPublishedRoutes(published);
                setUnPublishedRoutes(unPublished);
            }
        } catch (err) {
            console.error("Error with getAdminRoutes", err);
        } finally {
            setRoutesLoading(false);
            setRefresh(false);
        }
    }

    const publishRoute = async (routeId) => {
        setRoutesLoading(true);
        const patchBody = { id: routeId, published: true };
        try {
            const resp = await axios.patch(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/admin-publish/${routeId}`, patchBody);
            console.log(resp);
            if (resp.status === 200) {
                setRefresh(true);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error with publishRoute", err);
            return false;
        } finally {
            setRoutesLoading(false);
        }
    }

    const unPublishRoute = async (routeId) => {
        setRoutesLoading(true);
        const patchBody = { id: routeId, published: false };
        try {
            const resp = await axios.patch(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/admin-publish/${routeId}`, patchBody);
            console.log(resp);
            if (resp.status === 200) {
                setRefresh(true);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error with unPublishRoute", err);
            return false;
        } finally {
            setRoutesLoading(false);
        }
    }

    const setRoutePublicVisibility = async (routeId) => {
        const patchBody = { id: routeId, publicVisibility: true };
        try {
            const resp = await axios.patch(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/public-status/${routeId}`, patchBody);
            console.log(resp);
            if (resp.status === 200) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error with setRoutePublicVisibility", err);
            return false;
        } finally {
        }
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
            if (resp.status === 200) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error with saveRoute", err);
            return false;
        } finally {
            setRoutesLoading(false);
        }
    }

    const saveRouteChanges = async (route, routeId) => {
        setRoutesLoading(true);
        console.log("saving route...");
        try {
            const resp = await axios.patch(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/${routeId}`, route);
            console.log(resp)
            if (resp.status === 200) {
                setRefresh(true);
                return true;
            }
        } catch (err) {
            console.error("Error with saveRouteChanges", err);
            return false;
        } finally {
            setRoutesLoading(false);
        }
    }

    const savePointChanges = async (point, pointId) => {
        //setRoutesLoading(true);
        console.log("saving point...");
        try {
            const resp = await axios.patch(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/point/${pointId}`, point);
            console.log(resp)
            if (resp.status === 200) {

                return true;
            }
        } catch (err) {
            console.error("Error with savePointChanges", err);
            return false;
        } finally {
            //setRoutesLoading(false);
        }
    }

    const deleteRoute = async (routeId) => {
        console.log("deleting route...");
        try {
            const resp = await axios.delete(`https://fmprojectbackendrmdev.azurewebsites.net/api/v1/route/delete/${routeId}`);
            console.log(resp)
            if (resp.status === 200) {
                setRefresh(true);
                return true;
            }
        } catch (err) {
            console.error("Error with savePointChanges", err);
            return false;
        } finally {
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
                createPoint,
                saveRoute,
                cancelRouteSave,
                routesLoading,
                routeToCreate, 
                setRouteToCreate,
                getAdminRoutes,
                publishedRoutes, 
                unPublishedRoutes,
                publishRoute,
                unPublishRoute,
                setRoutePublicVisibility,
                deleteRoute,
                setPointToCreate,
                saveRouteChanges,
                savePointChanges,
                refresh
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}