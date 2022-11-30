import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moon from '../img/moon.jpg';
import land from '../img/land.png';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ArrowUpwardOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Frontpage() {
  const ref = useRef()
  const navigate = useNavigate();
  const [tietosuoja, setTietosuoja] = useState(false);
  const [terms, setTerms] = useState(false);

  const toggleTietoModal = () => {
    setTietosuoja(!tietosuoja);
  }

  const toggleTermsModal = () => {
    setTerms(!terms);
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
    <Parallax pages={4} ref={ref}>
      <ParallaxLayer offset={0} factor={2} speed={1} style={{
        backgroundImage: `url(${moon})`,
        backgroundSize: `cover`,
      }}
      />

      <ParallaxLayer factor={4} offset={2} speed={1} style={{
        backgroundImage: `url(${land})`,
        backgroundSize: `cover`,
      }}></ParallaxLayer>

      <ParallaxLayer offset={0.2} speed={0.05}>
      <Typography
              component="h1"
              variant="h4"
              align="center"
              color="white"
              gutterBottom
            >
              Hautausmaakierrokset: Joensuu
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => navigate("/map")}>Hyppää kartalle</Button>
              <Button variant="contained" onClick={() => ref.current.scrollTo(3)}>Lue lisää</Button>
            </Stack>
      </ParallaxLayer>

      <ParallaxLayer offset={3} speed={2}>
      <Typography
              component="h3"
              variant="h2"
              align="center"
              color="white"
              gutterBottom
            >
              Mikä tämä sovellus on?
            </Typography>
        <Typography variant="h5" align="center" color="white" paragraph>
              Tällä sovelluksella voit luoda ja seurata reittejä Joensuun hautausmaalla. Voit selailla julkisia reittejä ilman rekisteröitymistä.
              Jos haluat luoda reittejä, sivun oikeasta ylälaidasta voit luoda tunnuksen ja sitten voit aloittaa omien reittien luomisen. 

        </Typography>
        <br></br>
        <br></br>
        <Typography variant="h6" align="center" color="white" style={{ cursor: "pointer" }} onClick={toggleTietoModal}>Tietosuoja</Typography>
        <Typography variant="h6" align="center" color="white" style={{ cursor: "pointer" }} onClick={toggleTermsModal}>Käyttöehdot</Typography>
        <IconButton style={{ margin: 'auto', width: '100%' }} onClick={() => ref.current.scrollTo(0)}>
          <ArrowUpwardOutlined style={{ color: 'white' }} fontSize='large'/>
        </IconButton>
        <Typography style={{opacity: '80%'}} variant="caption" color="white" align="center" paragraph>Takaisin ylös</Typography>
      </ParallaxLayer>
    </Parallax>
    </div>
  )
}

export default Frontpage