import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moon from '../img/moon.jpg';
import land from '../img/land.png';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { IconButton } from '@mui/material';
import { ArrowUpwardOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

function Frontpage() {
  const ref = useRef()
  const navigate = useNavigate();

  return (
    <div>
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
              variant="h2"
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
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
        </Typography>
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