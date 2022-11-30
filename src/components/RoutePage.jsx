import React, { useState, useContext, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, IconButton, Tooltip, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Collapse, Snackbar, Alert, Box, CircularProgress } from '@mui/material';
import { Container } from '@mui/material';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { RouteContext } from '../context/RouteProvider';
import { MapContext } from '../context/MapProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function OwnRow(props) {
  const { row } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [routeEditOpen, setRouteEditOpen] = useState(false);
  const [pointEditOpen, setPointEditOpen] = useState(false);
  const [pointEdit, setPointEdit] = useState({});
  const [routeEdit, setRouteEdit] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { setRoutePublicVisibility, deleteRoute, saveRouteChanges, savePointChanges, refresh } = useContext(RouteContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setAlertOpen(false);
  }

  const handleCreateClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setCreateOpen(false);
  }

  const toggleRouteModal = () => {
      setRouteEditOpen(!routeEditOpen);
  }

  const togglePointModal = () => {
      setPointEditOpen(!pointEditOpen);
  }

  const openPointEdit = (point) => {
    setPointEdit(point);
    togglePointModal();
  }

  const openRouteEdit = (route) => {
    setRouteEdit(route);
    toggleRouteModal();
  }

  const onNameTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRouteEdit((prevState) => {
        return { ...prevState, name: value }
    })
  }

  const onDescTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRouteEdit((prevState) => {
        return { ...prevState, description: value }
    })
  }

  const onPointNameTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setPointEdit((prevState) => {
        return { ...prevState, name: value }
    })
  }

  const onPointDescTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setPointEdit((prevState) => {
        return { ...prevState, description: value }
    })
  }
  
  const onDeleteRowClick = async (rowId) => {
    const success = await deleteRoute(rowId);
    if (success) {
      setCreateOpen(true);
    } else {
      setAlertOpen(true);
    }
  }

  const onPublishClick = async (rowId) => {
    const success = await setRoutePublicVisibility(rowId);
    if (success) {
      setCreateOpen(true);
    } else {
      setAlertOpen(true);
    }
  }

  const routeSave = async (rowId) => {
    const success = await saveRouteChanges(routeEdit, rowId);
    if (success) {
      setCreateOpen(true);
      toggleRouteModal();
    } else {
      setAlertOpen(true);
    }
  }

  const pointSave = async (pointId) => {
    const success = await savePointChanges(pointEdit, pointId);
    if (success) {
      setCreateOpen(true);
      togglePointModal();
    } else {
      setAlertOpen(true);
    }
  }

  return (
    <>
    <Dialog open={routeEditOpen} onClose={toggleRouteModal}>
            <DialogTitle>Reitin tietojen muokkaus</DialogTitle>
            <DialogContent>
                <TextField id="name" label="Nimi" value={routeEdit.name} onChange={(e) => onNameTextChange(e)} />
                <TextField id="description" label="Kuvaus" value={routeEdit.description} onChange={(e) => onDescTextChange(e)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => routeSave(row.id)}>Tallenna</Button>
                <Button onClick={toggleRouteModal}>Peruuta</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={pointEditOpen} onClose={togglePointModal}>
            <DialogTitle>Pysähdyksen tietojen muokkaus</DialogTitle>
            <DialogContent>
                <TextField id="name" label="Nimi" value={pointEdit.name} onChange={(e) => onPointNameTextChange(e)} />
                <TextField multiline maxRows={4} id="description" label="Kuvaus" value={pointEdit.description} onChange={(e) => onPointDescTextChange(e)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => pointSave(pointEdit.id)}>Tallenna</Button>
                <Button onClick={togglePointModal}>Peruuta</Button>
            </DialogActions>
        </Dialog>
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Toiminto epäonnistui!
            </Alert>
        </Snackbar>
      <Snackbar open={createOpen} autoHideDuration={6000} onClose={handleCreateClose}>
            <Alert onClose={handleCreateClose} severity="success" sx={{ width: '100%' }}>
                Toiminto onnistui!
            </Alert>
      </Snackbar>
    <TableRow
      sx={{ '& > *': { borderBottom: 'unset' }}}
    >
      <TableCell component="th" scope="row">
      <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setDetailsOpen(!detailsOpen)}
        >{detailsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        <Tooltip title="Muokkaa tietoja" arrow>
          <IconButton onClick={(e) => openRouteEdit(row)} >
              <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Poista reitti" arrow>
          <IconButton onClick={(e) => onDeleteRowClick(row.id)}>
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
      <TableCell align="right"><Button variant="contained" disabled={row.published} onClick={(e) => onPublishClick(row.id)}>Pyydä julkaisua</Button></TableCell>
    </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={detailsOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Pysähdykset
                </Typography>
                <Table size="small" aria-label="stops">
                    <TableHead>
                    <TableRow>
                      <TableCell>Muokkaa</TableCell>
                      <TableCell>Järjestysnro</TableCell>
                      <TableCell align="right">Nimi</TableCell>
                      <TableCell align="right">Kuvaus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {row.points.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Muokkaa tietoja" arrow>
                          <IconButton onClick={(e) => openPointEdit(point)}>
                              <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{point.orderNo}</TableCell>
                      <TableCell align="right">{point.name}</TableCell>
                      <TableCell align="right">{point.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function RoutePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { ownRoutes, getOwnRoutes, setRouteToCreate, refresh, routesLoading } = useContext(RouteContext);
  const { setEditMode } = useContext(MapContext);
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

  useEffect(() => {
    if (refresh) {
      getOwnRoutes();
    }
  }, [refresh]);

  const onNameTextChange = (e) => {
    const { target } = e;
    const { value } = target;
    setRouteToCreate((prevState) => {
        return { ...prevState, name: value }
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
      {routesLoading ? (
        <CircularProgress size={24} style={{ marginLeft: "10%" }} /> 
        ) : 
        (
        <>
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Reitin luonti</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Lisää reitin tiedot ja sitten siirry kartalle lisätäksesi pysähdyksiä. 
                    Luodut reitit ovat oletuksena yksityisiä, sinun täytyy julkaista ne itse, jos haluat, että muut näkevät ne.
                    Julkaisun jälkeen ylläpito tarkistaa reitit ja päättää niiden lopullisesta julkaisusta.
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
        <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
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
                <OwnRow key={row.id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
        )}
    </Container>
  )
}
