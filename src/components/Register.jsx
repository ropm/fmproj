import { Grid, Paper, TextField, Button, CircularProgress } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({});
  const [loading, setLoading] = useState(false);

  const onRegClick = async () => {
    setLoading(true);
    try {
      const resp = await axios.post("https://fmprojectbackendrmdev.azurewebsites.net/api/v1/register", register);
      console.log(resp)
      if (resp.status === 200) {
        navigate("/login");
      }
      
    } catch (err) {
      console.error("Error with onRegClick", err);
    } finally {
      setLoading(false);
    }
  }

  const onEmailTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRegister((prevState) => {
      return {...prevState, username: value}
    })
  }

  const onUserTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRegister((prevState) => {
      return {...prevState, visibleName: value}
    })
  }

  const onPassTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRegister((prevState) => {
      return {...prevState, password: value}
    })
  }

  return (
    <div>      
      {loading ? (
        <CircularProgress size={24} style={{ marginLeft: "10%" }} /> 
        ) : 
        (
      <Paper sx={{ height: '100vh', marginTop: '20px' }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField error={!register.username} label="Sähköposti" required onChange={(e) => onEmailTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField error={!register.visibleName} label="Käyttäjätunnus" required onChange={(e) => onUserTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField error={!register.password} label="Password" type={'password'} required onChange={(e) => onPassTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={onRegClick}> Rekisteröidy </Button>
          </Grid>
        </Grid>
      </Paper>
      )}
      </div>
  )
}

export default Register;