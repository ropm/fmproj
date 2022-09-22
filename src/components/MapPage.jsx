import React, { useState, useEffect, useRef, useContext } from 'react'
import maplibregl from 'maplibre-gl';
import { Divider, Snackbar, Alert, CircularProgress, Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

import './map.css';
import { MapContext } from '../context/MapProvider';
import SaveRouteControl from './SaveRouteControl';
import { RouteContext } from '../context/RouteProvider';
import CancelRouteControl from './CancelRouteControl';
import SelectOwnRouteControl from './SelectOwnRouteControl';
import SelectPublicRouteControl from './SelectPublicRouteControl';
import StartRouteFollowControl from './StartRouteFollowControl';
import StopRouteFollowControl from './StopRouteFollowControl';

const position = [62.609, 29.767]

const getIsMobile = () => window.innerWidth <= 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
            console.log("resizing")
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isMobile;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MapPage() {
    const mapContainer = useRef(null);
    const { map, locateMe, createMap, geolocateAlert, setGeolocateAlert, loading, editMode, setEditMode, selection, setSelection } = useContext(MapContext);
    const { createPoint, saveRoute, cancelRouteSave, getAllRoutes, getOwnRoutes, getPublicRoutes, ownRoutes, publicRoutes, routesLoading } = useContext(RouteContext);
    const [pointToCreate, setPointToCreate] = useState({});
    const [saveRouteMapCtrl, setSaveRouteMapCtrl] = useState(null);
    const [cancelRouteMapCtrl, setCancelRouteMapCtrl] = useState(null);
    const [selectOwnRouteMapCtrl, setSelectOwnRouteMapCtrl] = useState(null);
    const [selectPubRouteMapCtrl, setSelectPubRouteMapCtrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [openOwnRoutesList, setOpenOwnRoutesList] = useState(false);
    const [openPubRoutesList, setOpenPubRoutesList] = useState(false);
    const [startRouteMapCtrl, setStartRouteMapCtrl] = useState(null);
    const [stopRouteMapCtrl, setStopRouteMapCtrl] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState();
    const [currentMarkers, setCurrentMarkers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [divHeight, setHeight] = useState('800px');
    
    const [lat, setLat] = useState(62.609);
    const [lng, setLng] = useState(29.767);
    const [zoom, setZoom] = useState(16);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const geolocateConfig = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
    };

    const style = {
        "version": 8,
        "sources": {
        "osm": {
                "type": "raster",
                "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                "tileSize": 256,
            "attribution": "&copy; OpenStreetMap Contributors",
            "maxzoom": 19
        }
        },
        "layers": [
        {
            "id": "osm",
            "type": "raster",
            "source": "osm" // This must match the source key above
        }
        ]
    };

    const isMobile = useIsMobile();

    let finalMap = null;
    let currents = [];

    useEffect(() => {
        console.log("mappage useeffect: creating map...")
        finalMap = new maplibregl.Map({
            container: mapContainer.current,
            style: style,
            center: [lng, lat],
            zoom: zoom
        });

        finalMap.addControl(new maplibregl.NavigationControl(), 'top-right');
        const geolocate = new maplibregl.GeolocateControl(geolocateConfig);
        finalMap.addControl(geolocate);

        const saveRouteCtrl = new CancelRouteControl();
        const cancelRouteCtrl = new SaveRouteControl();
        const ownRouteCtrl = new SelectOwnRouteControl();
        const pubRouteCtrl = new SelectPublicRouteControl();
        const startRouteCtrl = new StartRouteFollowControl();
        const stopRouteCtrl = new StopRouteFollowControl();

        setSaveRouteMapCtrl(saveRouteCtrl);
        setCancelRouteMapCtrl(cancelRouteCtrl);
        setSelectOwnRouteMapCtrl(ownRouteCtrl);
        setSelectPubRouteMapCtrl(pubRouteCtrl);
        setStartRouteMapCtrl(startRouteCtrl);
        setStopRouteMapCtrl(stopRouteCtrl);

        finalMap.addControl(saveRouteCtrl);
        finalMap.addControl(cancelRouteCtrl);
        finalMap.addControl(ownRouteCtrl);
        finalMap.addControl(pubRouteCtrl);
        finalMap.addControl(startRouteCtrl);
        finalMap.addControl(stopRouteCtrl);

        createMap(finalMap, geolocate);
        setLoaded(true);

    }, []);

    useEffect(() => {
        if (!loaded) {
            return;
        }
        saveRouteMapCtrl.getButton().addEventListener('click', (e) => {
            setEditMode(false);
            saveRoute();
        });
        
        cancelRouteMapCtrl.getButton().addEventListener('click', (e) => {
            setEditMode(false);
            cancelRouteSave();
        });

        selectOwnRouteMapCtrl.getButton().addEventListener('click', (e) => {
            if (editMode) {
                setOpen(true);
            }
            getOwnRoutes();
            setOpenOwnRoutesList(true);
        });
        
        selectPubRouteMapCtrl.getButton().addEventListener('click', (e) => {
            if (editMode) {
                setOpen(true);
            }
            getPublicRoutes();
            setOpenPubRoutesList(true);
        });

        startRouteMapCtrl.getButton().addEventListener('click', (e) => {
            console.log(selection)
            if (!selection) {
                console.log('selected route null');
                return;
            }
            const firstCoords = [selection.points[0].y, selection.points[0].x];
            const flying = {
                bearing: 10,
                center: firstCoords,
                zoom: 18.5,
                pitch: 20,
                speed: 0.5
            }
            map.flyTo(flying);
  
            if (locateMe && locateMe._geolocateButton) {
                console.log("here")
                locateMe._geolocateButton.click();
            }
            selection.points.map((point) => {
                console.log("adding points")
                const coords = [point.y, point.x];
                const marker = new maplibregl.Marker({color: "#FF0000"}).setLngLat(coords);
                marker.addTo(map);
                currents.push(marker);
            })
        });

        stopRouteMapCtrl.getButton().addEventListener('click', (e) => {
            if (!selection) {
                return;
            }
            currents.forEach((marker) => {
                marker.remove();
            });
            const flying = {
                bearing: 0,
                center: [lng, lat],
                zoom: zoom,
                pitch: 0,
                speed: 0.5
            }
            map.flyTo(flying);
            
        });

        map.on('click', (e) => {
            if (editMode) {
                console.log('mappage: A click event has occurred at ', e.lngLat);
                const coords = { lng: e.lngLat.lng, lat: e.lngLat.lat}
                new maplibregl.Marker({color: "#FF0000", draggable: true}).setLngLat(coords).addTo(createdMap);
                const point = {
                    name: "testi",
                    description: "testiä",
                    x: coords.lat,
                    y: coords.lng
                }
                //setPointToCreate(point);
                createPoint(point);
            }
        })
    }, [selection, editMode, loaded])

    useEffect(() => {
        if (saveRouteMapCtrl != null && cancelRouteMapCtrl != null) {
            if (!editMode) {
                saveRouteMapCtrl.getButton().setAttribute("disabled", "");
                cancelRouteMapCtrl.getButton().setAttribute("disabled", "");
            } else {
                saveRouteMapCtrl.getButton().setAttribute("enabled", "");
                cancelRouteMapCtrl.getButton().setAttribute("enabled", "");
            }
        }
    }, [saveRouteMapCtrl, cancelRouteMapCtrl, editMode]);
    
    useEffect(() => {
        if (isMobile) {
            setHeight('400px')
        } else {
            setHeight('900px')
        }
    }, [isMobile]);

    const handleRouteSelect = (route) => {
        console.log("selecting route", route);
        currents.forEach((marker) => {
            marker.remove();
        });
        setSelection(route);
        setOpenOwnRoutesList(false);
        setOpenPubRoutesList(false);
    }
    
    return (
    <>
    {loading ? (
        <CircularProgress size={24} style={{ marginLeft: "10%" }} /> 
        ) : 
        (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Reittivalintaa ei voi avata muokkaustilassa!
                </Alert>
            </Snackbar>
            <Modal open={openOwnRoutesList} onClose={() => setOpenOwnRoutesList(false)}>
                <Box sx={modalStyle}>
                    <Typography id="own-modal-modal-title" variant="h6" component="h2">
                        Valitse oma reitti
                    </Typography>
                    {routesLoading ? (<CircularProgress size={24} style={{ marginLeft: "50%", marginTop: "5%", color: "white" }} />) : (
                        <List>
                            {ownRoutes.map((route) => (
                                <>
                                <ListItem disablePadding key={route.id} style={{ cursor: 'pointer' }} onClick={() => handleRouteSelect(route)}>
                                    <ListItemText style={{color: "white"}} primary={route.name} 
                                        secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="#D3D3D3"
                                        >{route.description.length > 25 ? route.description.substring(25) + "..." : route.description}</Typography>
                                    } />
                                </ListItem>
                                <Divider component="li" />
                                </>
                            ))}
                        </List>
                        )}
                </Box>
            </Modal>
            <Modal open={openPubRoutesList} onClose={() => setOpenPubRoutesList(false)}>
                <Box sx={modalStyle}>
                    <Typography id="pub-modal-modal-title" variant="h6" component="h2">
                        Valitse julkaistu reitti
                    </Typography>
                    {routesLoading ? (<CircularProgress size={24} style={{ marginLeft: "50%", marginTop: "5%", color: "white" }} />) : (
                        <List>
                            {publicRoutes.map((route) => (
                                <>
                                <ListItem disablePadding key={route.id} style={{ cursor: 'pointer' }} onClick={() => handleRouteSelect(route)}>
                                    <ListItemText style={{color: "white"}} primary={route.name} 
                                        secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="#D3D3D3"
                                        >{route.description.length > 25 ? route.description.substring(25) + "..." : route.description}</Typography>
                                        
                                    } />
                                </ListItem>
                                <Divider component="li" />
                                </>
                            ))}
                        </List>
                        )}
                </Box>
            </Modal>
            <div ref={mapContainer} className="map-container" />
        </>
    )}
    </>
  )
}
