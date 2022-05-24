import React from 'react'
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Frontpage from './components/Frontpage';
import Login from './components/Login';
import AppMenuBar from './components/AppMenuBar';

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
      
        <AppMenuBar />
        <Routes>
          <Route path='/' element={<Frontpage />} />
          <Route path='login' element={<Login />} />
        </Routes>
    </ThemeProvider>
  )
}

export default App;
