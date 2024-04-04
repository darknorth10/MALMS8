import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems as MainListNav } from './NavList';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo_nobg.png'
import SignOutDialog from '../shared/SignOutDialog';
import Loading from '../shared/Loading';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();




export const InsideLayout = () => {
  const redirect = useNavigate()

  const role = localStorage.getItem('role')

  const [openSignout, setOpenSignOut] = React.useState(false);

  const handleSignoutOpen = () => {
    setOpenSignOut(true);
  };

  const handleSignoutClose = () => {
    setOpenSignOut(false);
  };

  const [loadingOpen, setLoadingOpen] = React.useState(false);
    
  const handleClose = () => {
    setLoadingOpen(false);
  };
  const handleOpen = () => {
    setLoadingOpen(true);
  };

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      redirect('/')
    }
  }, [redirect])


  const [pageName, setPagename] = React.useState("");
  const [current, setCurrent] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
            className='bg-blue-gray-900'
            
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {pageName}
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            
          >
            <img src={logo} alt="logo" className='h-16'/>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

            {/* Nav insertion  */}
            <MainListNav setOpenSignOut={setOpenSignOut} handleSignoutOpen={handleSignoutOpen} role={role}/>

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          {/* Insertion point of the page */}
          <div className='max-w-screen-2xl p-5 mx-auto min-h-[70vh]'>
            <Outlet context={{pageName, setPagename, current, setCurrent}} />
          </div>

        </Box>
      </Box>

      <SignOutDialog setOpenSignOut={setOpenSignOut} openSignout={openSignout} handleSignoutOpen={handleSignoutOpen} handleSignoutClose={handleSignoutClose} setLoadingOpen={setLoadingOpen} handleOpen={handleOpen} handleClose={handleClose}/>

      <Loading loadingOpen={loadingOpen} />


    </ThemeProvider>
  );
}