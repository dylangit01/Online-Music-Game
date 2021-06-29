import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './Navbar.scss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
// import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    // Black background with 30% opacity
    background: 'rgba(0, 0, 0, 0.3)',
  },
  musicButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  loggedIn: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);

  // Login user for demo purposes
  let displayLogin = '';
  if (!loggedIn) {
    displayLogin = (
      <div className='rightNavbarGroup'>
        <Button color='inherit' type='button' onClick={(e) => setLoggedIn(true)}>
          Login
        </Button>
        <IconButton color='inherit'>
          <WbSunnyIcon />
        </IconButton>
      </div>
    );
  } else {
    //User is logged in
    displayLogin = (
      <div className='rightNavbarGroup'>
        <Typography variant='h6' className={classes.loggedIn}>
          HELLO, DJ DYLAN!
        </Typography>
        <Button color='inherit' type='button' onClick={(e) => setLoggedIn(false)}>
          Logout
        </Button>
        <IconButton color='inherit'>
          <WbSunnyIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <div className='mainNavbarGroup'>
            {/* Left Navbar Group */}
            <div className='leftNavbarGroup'>
              <MusicNoteIcon fontSize='large' />
              <Button>
                <Typography variant='h5' className={classes.title}>
                  <Link to='/'>DROP THE BEAT</Link>
                </Typography>
              </Button>
              <Button color='inherit'>
                <Link to='/playlists'>Playlists</Link>
              </Button>
              <Button color='inherit'>
                Join A Game
              </Button>
            </div>

            {/* Right Navbar Group */}
            {displayLogin}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
