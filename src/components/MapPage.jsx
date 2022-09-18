import React, { useState, useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl';
import { Button } from '@mui/material';

import HelloWorldControl from './RouteControl'

import './map.css';

const position = [62.609, 29.767]

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

export default function MapPage() {
    const mapContainer = useRef(null);
    const [divHeight, setHeight] = useState('800px');
    const [lat, setLat] = useState(62.609);
    const [lng, setLng] = useState(29.767);
    const [zoom, setZoom] = useState(16);
    const [map, setMap] = useState(null);
    const [locateMe, setLocateMe] = useState(null);
    const [creationMode, setCreationMode] = useState(true); // todo: context
    const isMobile = useIsMobile();

    const geolocateConfig = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
    };

    useEffect(() => {
        if (map) {
            return;
        }
        const createdMap = new maplibregl.Map({
            container: mapContainer.current,
            style: style,
            center: [lng, lat],
            zoom: zoom
        });
        setMap(createdMap);
        createdMap.addControl(new maplibregl.NavigationControl(), 'top-right');
        new maplibregl.Marker({color: "#FF0000"}).setLngLat([lng,lat]).addTo(createdMap);
        const geolocate = new maplibregl.GeolocateControl(geolocateConfig);
        setLocateMe(geolocate);
        createdMap.addControl(geolocate);

        const ctrl = new HelloWorldControl();
        createdMap.addControl(ctrl)
    }, [mapContainer.current]);
    
    useEffect(() => {
        console.log(isMobile)
        if (isMobile) {
            setHeight('400px')
        } else {
            setHeight('900px')
        }
    }, [isMobile]);

    if (locateMe) {
        locateMe.on('geolocate', () => {
            console.log("geolocating...")
        })
    }

    if (map && creationMode) {
        map.on('click', (e) => {
            console.log('A click event has occurred at ', e.lngLat);
            const coords = { lng: e.lngLat.lng, lat: e.lngLat.lat}
            new maplibregl.Marker({color: "#FF0000"}).setLngLat(coords).addTo(map);
        })
    }
    
    return (
    <>
        <div ref={mapContainer} className="map-container" />
    </>
  )
}
