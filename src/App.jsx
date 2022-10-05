import React from 'react'
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Frontpage from './components/Frontpage';
import Login from './components/Login';
import AppMenuBar from './components/AppMenuBar';
import MapPage from './components/MapPage';
import RoutePage from './components/RoutePage';
import MapProvider from './context/MapProvider';
import RouteProvider from './context/RouteProvider';
import Register from './components/Register';
import AuthProvider from './context/AuthProvider';
import axios from 'axios';

const theme = createTheme({  
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <MapProvider>
      <RouteProvider>
        <AppMenuBar />
        <Routes>
          <Route path='/' element={<Frontpage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='map' element={<MapPage />} />
          <Route path='routes' element={<RoutePage />} />
        </Routes>
        </RouteProvider>
        </MapProvider>
        </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
