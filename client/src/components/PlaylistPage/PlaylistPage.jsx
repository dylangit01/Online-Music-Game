import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DTBContext } from '../../contextAPI/DTBContext';

// Styling
import './PlaylistPage.scss';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Icons
import IconButton from '@material-ui/core/IconButton';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const WhiteRadio = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'MediumPurple',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: 'white',
    background: 'transparent',
    padding: 0,
  },
  icon: {
    background: 'linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)',
    marginRight: theme.spacing(1),
    // background: 'transparent',
  },
  mainHeading: {
    display: 'flex',
    alignItems: 'center',
    margin: '1vh',
  },
  difficulty: {
    marginLeft: theme.spacing(6),
  },
  divider: {
    background: 'rgba(255, 255, 255, 0.4)',
  },
  gameLink: {
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    marginLeft: theme.spacing(6),
    paddingLeft: theme.spacing(1),
    fontSize: theme.spacing(2),
    width: "70%",
    height: '25px',
    outline: 'none',
    border: 'none',
  },
  button: {
    background: "linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)",
    color: "white",
    marginBottom: theme.spacing(3),
  },
  dropdown: {
    color: "white",
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '30vw',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(0.5),
    height: '30%',
    color: 'white',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
  },
}));

export default function PlaylistPage() {
  const classes = useStyles();
  const history = useHistory();

  const { id } = useParams();
  const idNum = Number(id) - 1;

  // Using ContextAPI to set PlayList
  const { playlists, playlist, setPlaylist } = useContext(DTBContext);

  useEffect(() => {
    setPlaylist(playlists[idNum]);
  }, [playlists, idNum, setPlaylist]);

  // For difficulty control
  const [difficulty, setDifficulty] = useState('easy');
  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  // For songs dropdown menu:
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;

  // For dropdown menu control:
  const open = Boolean(anchorEl);
  const handleSongsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  // For starting a game (hard-coded big room for now)
  const handlePlaylistClick = (event) => {
    history.push('/game/epicbattle')
  };

  return (
    <>
      {playlist && (
        <div className='playlist-page'>
            <Typography variant='h4' className="playlist-name">{playlist.playlistName.toUpperCase()} PLAYLIST</Typography>
          <div className ='playlist-page-container'>


            {/* PLAYLIST DETAILS LEFT SIDE */}
            <div className='playlist-page-left'>
              <img src={playlist.playlistPhoto} alt="playlistPhoto"></img>
            </div>

            {/* PLAYLIST DETAILS RIGHT SIDE */}
            <div className='playlist-page-right'>
              <List className={classes.root}>
                {/* Difficulty */}
                <ListItem >
                  <ListItemText>
                    <Typography variant='h5' className={classes.mainHeading}>
                      {/* <Avatar className={classes.icon}><TimelapseIcon /></Avatar> */}
                      <span>Difficulty</span>
                    </Typography>
                    <FormControl component='fieldset' className={classes.difficulty}>
                      <RadioGroup
                        aria-label='difficulty'
                        name='difficulty'
                        value={difficulty}
                        onChange={handleDifficulty}
                      >
                        <FormControlLabel value='easy' control={<WhiteRadio />} label='Easy (30 seconds)' />
                        <FormControlLabel value='medium' control={<WhiteRadio />} label='Medium (20 seconds)' />
                        <FormControlLabel value='difficult' control={<WhiteRadio />} label='Difficult (10 seconds)' />
                      </RadioGroup>
                    </FormControl>
                  </ListItemText>
                </ListItem>
                <Divider variant="middle" component="li" className={classes.divider} />

                {/* Songs */}
                <ListItem >
                  <ListItemText>
                    <div className="songs-section">
                      <Typography variant='h5' className={classes.mainHeading}>
                        {/* <Avatar className={classes.icon}><QueueMusicIcon /></Avatar> */}
                        <span>Songs</span>
                      </Typography>
                      <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleSongsClick}>
                        <ExpandMoreIcon className={classes.dropdown} />
                      </IconButton>
                    </div>
                  </ListItemText>
                  <Menu
                      id='long-menu'
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.0,
                          width: '30ch',
                          backgroundColor: 'rgba(30, 30, 30, 1)',
                          color: '#fff',
                          lineHeight: 0,
                        },
                      }}
                    >
                      {playlist.songs.map((song) => (
                        <MenuItem key={song.id} value={song.title} onClick={handleClose}>
                          {`${song.title} - ${song.artist}`}
                        </MenuItem>
                      ))}
                    </Menu>
                </ListItem>
                <Divider variant="middle" component="li" className={classes.divider} />
                
                {/* Game Code */}
                <ListItem >
                  <ListItemText>
                    <Typography variant='h5' className={classes.mainHeading}>
                      {/* <Avatar className={classes.icon}><LinkIcon /></Avatar> */}
                      <span>Game Code</span>
                    </Typography>
                    <div className='game-code-section'>
                      <input type="text" name="gameLink" className={classes.gameLink} defaultValue="https://drop-the-beat.com/game/epicbattle"></input>
                      <IconButton color="inherit" aria-label="copy" component="span"><FileCopyIcon /></IconButton>
                    </div>
                  </ListItemText>
                </ListItem>
              </List>

              {/* Start Game Lobby Button */}
              <Button variant="contained" size="small" className={classes.button} onClick={handlePlaylistClick}>Start Lobby</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
