import React, { useState } from 'react'
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
import { Delete, Edit, Public } from '@mui/icons-material';

function createData(name, calories, julk, fat, carbs) {
    return { name, calories, julk, fat, carbs };
  }
  
  const rows = [
    createData('Reitti 1', 'Esimerkki', "e.e@email.com", false, 24),
    createData('Reitti 2', 'Esimerkki', "e.e@email.fi", true, 37)
  ];

export default function RoutePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
      setIsOpen(!isOpen);
  }

  return (
    <Container>
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Reitin luonti</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Lisää reitin tiedot ja sitten siirry kartalle lisätäksesi pysähdyksiä
                </DialogContentText>
                <TextField id="nimi" label="Nimi" />
                <TextField id="nimi" label="Nimi" />
                <Checkbox label="Yksityinen" />
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleModal}>Tallenna & siirry kartalle</Button>
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
                <TableCell align="right">Julkaisija</TableCell>
                <TableCell align="right">Yksityinen</TableCell>
                <TableCell align="right">Tykkäykset</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
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
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.julk}</TableCell>
                <TableCell align="right"><Checkbox checked={row.fat} disabled /></TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  )
}
