import { Announcement } from '@mui/icons-material';
import { Grid, Paper, TextField, Button, CircularProgress, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tietosuoja, setTietosuoja] = useState(false);
  const [terms, setTerms] = useState(false);

  const onRegClick = async () => {
    setRegisterError("");
    if (!check) {
      setRegisterError("Sinun täytyy hyväksyä käyttöehdot")
      return; 
    }
    if (!register.visibleName || !register.username || !register.password) {
      setRegisterError("Kaikki kentät ovat pakollisia")
      return; 
    }
    setLoading(true);
    try {
      const resp = await axios.post("http://fmprojectbackendrmdev.azurewebsites.net/api/v1/register", register);
      console.log(resp)
      if (resp.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error with onRegClick", err);
      if (err.response.data) {
        setRegisterError(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const toggleTietoModal = () => {
    setTietosuoja(!tietosuoja);
  }

  const toggleTermsModal = () => {
    setTerms(!terms);
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
      <Dialog open={tietosuoja} onClose={toggleTietoModal}>
            <DialogTitle>Tietosuojaseloste</DialogTitle>
            <DialogContent>
                <Typography>Sovellus kerää rekisteröityessäsi sähköpostiosoitteen väärinkäytöstapausten jäljittämistä ja estämistä varten. 
                  Vain ylläpito näkee reittien luojien sähköpostiosoitteen, jos käyttäjä haluaa julkaista luomansa reitin. 
                  Sähköpostiosoitteisiin ei lähetetä markkinointiviestejä. 
                  Sinulla on oikeus pyytää ylläpidolta tunnuksesi poistamista.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleTietoModal}>OK</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={terms} onClose={toggleTermsModal}>
            <DialogTitle>Käyttöehdot</DialogTitle>
            <DialogContent>
                <Typography>Sivua käyttämällä sitoudut noudattamaan hyviä toimintatapoja.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleTermsModal}>OK</Button>
            </DialogActions>
    </Dialog>
      <Paper sx={{ height: '100vh', marginTop: '20px' }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
        {loading ? (
        <CircularProgress size={24} style={{ marginLeft: "50%" }} /> 
        ) : 
        (
          <>
          <Grid item xs={12}>
            <TextField label="Sähköposti" required onChange={(e) => onEmailTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Käyttäjätunnus" required onChange={(e) => onUserTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} required onChange={(e) => onPassTextChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel label="Hyväksyn käyttöehdot" 
              control={<Checkbox checked={check} onChange={() => setCheck(!check)} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={onRegClick}> Rekisteröidy </Button>
          </Grid>
          <Grid item xs={12}>
          <Typography align="center" color="red" sx={{ marginBottom: '25px' }}>{registerError}</Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography align="center" color="white" style={{ cursor: "pointer" }} onClick={toggleTietoModal}>Tietosuoja</Typography>
          </Grid>
          <Grid item xs={12}>
        <Typography align="center" color="white" style={{ cursor: "pointer" }} onClick={toggleTermsModal}>Käyttöehdot</Typography>
        </Grid>
          </>
          )}
        </Grid>
        
      </Paper>
      </div>
  )
}

export default Register;