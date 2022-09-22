import React, { useState, useContext, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, IconButton, Tooltip, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { Container } from '@mui/material';
import Map from '@mui/icons-material/Map';
import { Delete, Edit, Public, PublicRounded, Publish } from '@mui/icons-material';
import { RouteContext } from '../context/RouteProvider';
import { MapContext } from '../context/MapProvider';
import { useNavigate } from 'react-router-dom';

export default function RoutePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { ownRoutes, getOwnRoutes } = useContext(RouteContext);
  const { editMode, setEditMode } = useContext(MapContext);
  const navigate = useNavigate();

  const toggleModal = () => {
      setIsOpen(!isOpen);
  }

  const moveToMapWithEditMode = () => {
    toggleModal();
    setEditMode(true);
    navigate("/map");
  }

  useEffect(() => {
    getOwnRoutes();
  }, []);

  const onSaveRowClick = async (row) => {

  }

  const onDeleteRowClick = async (row) => {

  }

  const onChange = (e, row) => {
    const { id } = row;
    const { value, name } = e.target;
    console.log("onchange triggering");
  }

  return (
    <Container>
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Reitin luonti</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Lisää reitin tiedot ja sitten siirry kartalle lisätäksesi pysähdyksiä. 
                    Luodut reitit ovat oletuksena yksityisiä, sinun täytyy julkaista ne itse, jos haluat, että muut näkevät ne.
                </DialogContentText>
                <TextField id="name" label="Nimi" />
                <TextField id="description" label="Kuvaus" />
            </DialogContent>
            <DialogActions>
                <Button onClick={moveToMapWithEditMode}>Tallenna & siirry kartalle</Button>
                <Button onClick={toggleModal}>Peruuta</Button>
            </DialogActions>
        </Dialog>
        <Typography>&nbsp;</Typography>
        <Button variant="contained" onClick={toggleModal}>Luo uusi reitti</Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Toiminnot</TableCell>
                <TableCell align="right">Nimi</TableCell>
                <TableCell align="right">Kuvaus</TableCell>
                <TableCell align="right">Pysähdysten määrä</TableCell>
                <TableCell align="right">Tekijä</TableCell>
                <TableCell align="right">Tykkäykset</TableCell>
                <TableCell align="right">Julkinen</TableCell>
                <TableCell align="right">Julkaise reitti</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ownRoutes.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    <Tooltip title="Avaa kartalla" arrow>
                    <IconButton>
                        <Public />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Muokkaa tietoja" arrow>
                    <IconButton>
                        <Edit />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Poista reitti" arrow>
                    <IconButton>
                        <Delete />
                    </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.points.length}</TableCell>
                <TableCell align="right">{row.creator}</TableCell>
                <TableCell align="right">{row.likes}</TableCell>
                <TableCell align="right"><Checkbox checked={row.publicVisibility} disabled /></TableCell>
                <TableCell align="right"><Button variant="contained" disabled={row.publicVisibility}>Julkaise</Button></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  )
}
