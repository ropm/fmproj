import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import maplibregl from 'maplibre-gl';

export const MapContext = createContext(null);

export default function MapProvider({ children }) {
    const [map, setMap] = useState(null);
    const [locateMe, setLocateMe] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [followMode, setFollowMode] = useState(false);
    const [geolocateAlert, setGeolocateAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState(null);

    const createMap = (createdMap, geolocate) => {
        setLoading(true);
        setMap(createdMap);
        setLocateMe(geolocate);
        setLoading(false);
    }

    const checkLocate = async () => {
        const result = await navigator.permissions.query({ name: "geolocation" });
        return result.state;
    }

    useEffect(() => {
        console.log("initing", map)
    }, [])

    useEffect(() => {
        if (locateMe) {
            console.log("useeffect geolocate");
            const geolocateState = checkLocate();
            if (geolocateState === 'denied') {
                setGeolocateAlert(true);
                return;
            }
            locateMe.on('geolocate', () => {
                console.log("geolocating...")
            })
        }
    }, [locateMe])

    useEffect(() => {
        if (map && followMode) {
            console.log("useeffect followmode")
            map.setZoom(19);
            // tilt?
        }
    }, [followMode])

    return (
        <MapContext.Provider 
            value={{
                map,
                setMap,
                editMode,
                setEditMode,
                followMode,
                setFollowMode,
                createMap,
                locateMe,
                geolocateAlert, 
                setGeolocateAlert,
                loading,
                selection, setSelection
            }}
        >
            {children}
        </MapContext.Provider>
    );
}