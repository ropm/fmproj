import React, { useContext } from 'react'
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import DirectionsIcon from '@mui/icons-material/Directions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function AppMenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {isAuthenticated, setIsAuthenticated, setAccess, user, isAdmin} = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    setAccess(null);
    localStorage.removeItem("HK_REFRESH");
    localStorage.removeItem("HK_ACCESS");
    handleCloseUserMenu();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            HKIERROS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              <NavLink to="/" className="unselected-nav">
                <MenuItem key="Etusivu" onClick={handleCloseNavMenu}>
                  <Typography sx={{ color: 'white' }} textAlign="center">Etusivu</Typography>
                </MenuItem>
                </NavLink>
                <NavLink to="/map" className="unselected-nav">
                <MenuItem key="Kartta" onClick={handleCloseNavMenu}>
                  <Typography sx={{ color: 'white' }} textAlign="center">Kartta</Typography>
                </MenuItem>
                </NavLink>
                {isAuthenticated && (
                <NavLink to="/routes" className="unselected-nav">
                <MenuItem key="Reitit" onClick={handleCloseNavMenu}>
                  <Typography sx={{ color: 'white' }} textAlign="center">Omat reitit</Typography>
                </MenuItem>
                </NavLink>
                )}
                {isAdmin && (
                  <NavLink to="/admin" className="unselected-nav">
                  <MenuItem key="Admin" onClick={handleCloseNavMenu}>
                    <Typography sx={{ color: 'white' }} textAlign="center">Admin</Typography>
                  </MenuItem>
                  </NavLink>
                )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
                        HKIERROS

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <NavLink to="/" className="unselected-nav">
            <Button sx={{ my: 2, color: 'white', display: 'block' }} key="Etusivu" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Etusivu</Typography>
                </Button>
                </NavLink>
                <NavLink to="/map" className="unselected-nav">
                <Button sx={{ my: 2, color: 'white', display: 'block' }} key="Kartta" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Kartta</Typography>
                </Button>
                </NavLink>
                {isAuthenticated && (
                <NavLink to="/routes" className="unselected-nav">
                <Button sx={{ my: 2, color: 'white', display: 'block' }} key="Reitit" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Omat reitit</Typography>
                </Button>
                </NavLink>
                )}
                {isAdmin && (
                  <NavLink to="/admin" className="unselected-nav">
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} key="Admin" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Admin</Typography>
                    </Button>
                  </NavLink>
                )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavLink to="/login">
              <MenuItem key={"login"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" sx={{ color: 'white' }}>Kirjaudu</Typography>
              </MenuItem>
              </NavLink>
              <NavLink to="/">
              <MenuItem key={"logout"} onClick={handleLogoutClick} disabled={!isAuthenticated}>
                <Typography textAlign="center" sx={{ color: 'white' }}>{isAuthenticated && user ? `Kirjaudu ulos ${user}` : "Kirjaudu ulos"}</Typography>
              </MenuItem>
              </NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppMenuBar