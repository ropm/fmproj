import { Grid, Paper, TextField, Button, CircularProgress, Checkbox, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({});
  const [emailOk, setEmailOk] = useState(false);
  const [pwOk, setPwOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const {isAuthenticated, setIsAuthenticated, setAccessToken, setUser, setIsAdmin} = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/map");
    };
  })

  const onLoginClick = async () => {
    setRegisterError("");
    if (!login.username || !login.password) {
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("username", login.username);
      fd.append("password", login.password);
      const resp = await axios.post("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/login", fd);
      console.log(resp)
      setLoading(false);
      if (resp.status === 200) {
        setIsAuthenticated(true);
        setAccessToken(resp.data.access);
        setIsAdmin(resp.data.admin === "1");
        setUser(login.username);
        localStorage.setItem("HK_ACCESS", resp.data.access);
        localStorage.setItem("HK_REFRESH", resp.data.refresh);
        navigate("/map");
      }
      
    } catch (err) {
      setLoading(false);
      setRegisterError("Tarkista kirjautumistietosi");
      console.error("Error with onLoginClick", err);
    }
    
  }

  const onEmailTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setLogin((prevState) => {
      return {...prevState, username: value}
    })
    setEmailOk(true);
  }

  const onPassTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setLogin((prevState) => {
      return {...prevState, password: value}
    });
    setPwOk(true);
  }

  return (
    <div>
      <Paper sx={{ height: '100vh', marginTop: '20px' }}>
        {loading ? (
        <CircularProgress size={24} style={{ marginLeft: "10%" }} /> 
        ) : 
        (
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Sähköposti"  onChange={(e) => onEmailTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Salasana" type={'password'}  onChange={(e) => onPassTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={onLoginClick} disabled={!pwOk || !emailOk}> Kirjaudu </Button>
            <Button fullWidth onClick={() => navigate("/register")}> Rekisteröidy </Button>
          </Grid>
          <Typography>{registerError}</Typography>
        </Grid>
        )}
      </Paper>
    </div>
  )
}

export default Login