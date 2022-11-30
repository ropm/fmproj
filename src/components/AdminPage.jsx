import React, { useState, useContext, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Snackbar, Alert, IconButton, Collapse, Box, CircularProgress } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Container } from '@mui/material';
import { RouteContext } from '../context/RouteProvider';
import { AuthContext } from '../context/AuthProvider';

function OwnUnPubRow(props) {
  const { row } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { publishRoute } = useContext(RouteContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setOpen(false);
  }

  const handleCreateClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setCreateOpen(false);
  }

  const addPublished = async (rowId) => {
    const success = await publishRoute(rowId);
    if (success) {
      setCreateOpen(true);
    } else {
      setAlertOpen(true);
    }
  }

  return (
    <>
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
    <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setDetailsOpen(!detailsOpen)}
        >{detailsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
    <TableCell align="right">{row.name}</TableCell>
    <TableCell align="right">{row.description}</TableCell>
    <TableCell align="right">{row.points.length}</TableCell>
    <TableCell align="right">{row.creator}</TableCell>
    <TableCell align="right"><Button variant="contained" onClick={(e) => addPublished(row.id)}>Julkaise</Button></TableCell>
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
                        <TableCell>Järjestysnro</TableCell>
                        <TableCell align="right">Nimi</TableCell>
                        <TableCell align="right">Kuvaus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {row.points.map((point) => (
                    <TableRow key={point.orderNo}>
                      <TableCell component="th" scope="row">
                        {point.orderNo}
                      </TableCell>
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

function OwnPubRow(props) {
  const { row } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { unPublishRoute } = useContext(RouteContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setOpen(false);
  }

  const handleCreateClose = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setCreateOpen(false);
  }

  const removePublished = async (rowId) => {
    const success = await unPublishRoute(rowId);
    if (success) {
      setCreateOpen(true);
    } else {
      setAlertOpen(true);
    }
  }

  return (
    <>
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
    <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setDetailsOpen(!detailsOpen)}
        >{detailsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
    <TableCell align="right">{row.name}</TableCell>
    <TableCell align="right">{row.description}</TableCell>
    <TableCell align="right">{row.points.length}</TableCell>
    <TableCell align="right">{row.creator}</TableCell>
    <TableCell align="right"><Button variant="contained" onClick={(e) => removePublished(row.id)}>Poista julkaisu</Button></TableCell>
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
                        <TableCell>Järjestysnro</TableCell>
                        <TableCell align="right">Nimi</TableCell>
                        <TableCell align="right">Kuvaus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {row.points.map((point) => (
                    <TableRow key={point.orderNo}>
                      <TableCell component="th" scope="row">
                        {point.orderNo}
                      </TableCell>
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

export default function AdminPage() {
  const { publishedRoutes, unPublishedRoutes, getAdminRoutes, refresh, routesLoading } = useContext(RouteContext);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      getAdminRoutes();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin && refresh) {
      console.log("refreshing")
      getAdminRoutes();
    }
  }, [refresh]);

  return (
    <Container>
      {routesLoading ? (
        <CircularProgress size={24} style={{ marginLeft: "10%" }} /> 
        ) : 
        (
        <>
        <Typography sx={{ color: 'white', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px' }}>Julkaisemattomat reitit</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nimi</TableCell>
                <TableCell align="right">Kuvaus</TableCell>
                <TableCell align="right">Pysähdysten määrä</TableCell>
                <TableCell align="right">Tekijä</TableCell>
                <TableCell align="right">Julkaise reitti</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {unPublishedRoutes.map((row) => (
                    <OwnUnPubRow key={row.id} row={row} />
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Typography sx={{ color: 'white', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px' }}>Julkaistut reitit</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nimi</TableCell>
                <TableCell align="right">Kuvaus</TableCell>
                <TableCell align="right">Pysähdysten määrä</TableCell>
                <TableCell align="right">Tekijä</TableCell>
                <TableCell align="right">Poista julkisuus</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {publishedRoutes.map((row) => (
                    <OwnPubRow key={row.id} row={row} />
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
        )}
    </Container>
  )
}
