import React, { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { useMap } from 'react-leaflet/hooks'
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material'

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

export default function MapPage() {
    const [height, setHeight] = useState('800px');
    const isMobile = useIsMobile();
    
    useEffect(() => {
        console.log(isMobile)
        if (isMobile) {
            setHeight('400px')
        } else {
            setHeight('900px')
        }
    }, [isMobile]);
    
    return (
        <>
        <MapContainer center={position} zoom={17} scrollWheelZoom={true} style={{ height: height }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      </>
  )
}
