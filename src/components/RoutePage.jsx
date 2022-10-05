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
import { AuthContext } from '../context/AuthProvider';

export default function RoutePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { ownRoutes, getOwnRoutes, routeToCreate, setRouteToCreate } = useContext(RouteContext);
  const { editMode, setEditMode } = useContext(MapContext);
  const { isAuthenticated } = useContext(AuthContext);
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

    const onNameTextChange = (e) => {
        const { target } = e;
        const { value } = target;
        setRouteToCreate((prevState) => {
            return {...prevState, name: value}
        })
    }

    const onDescTextChange = (e) => {
        const { target } = e;
        const { value } = target;
        setRouteToCreate((prevState) => {
            return {...prevState, description: value}
        })
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
                <TextField id="name" label="Nimi" onChange={(e) => onNameTextChange(e)} />
                <TextField id="description" label="Kuvaus" onChange={(e) => onDescTextChange(e)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={moveToMapWithEditMode}>Tallenna & siirry kartalle</Button>
                <Button onClick={toggleModal}>Peruuta</Button>
            </DialogActions>
        </Dialog>
        <Typography>&nbsp;</Typography>
        <Button variant="contained" onClick={toggleModal} disabled={!isAuthenticated}>Luo uusi reitti</Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
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
