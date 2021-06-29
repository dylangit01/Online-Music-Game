import React from 'react';
import PlayerList from './PlayerList';

// Styling
import './Lobby.scss';
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

// Icons
import IconButton from '@material-ui/core/IconButton';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

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
  nameChange: {
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    marginLeft: theme.spacing(6),
    paddingLeft: theme.spacing(1),
    fontSize: theme.spacing(2),
    width: "55%",
    height: '25px',
    outline: 'none',
    border: 'none',
  },
  button: {
    background: "linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)",
    color: "white",
    marginBottom: theme.spacing(3),
  },
  nameButton: {
    background: "linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)",
    color: "white",
  },
  listItem: {
    marginLeft: theme.spacing(6),
  },
  players: {
    marginLeft: theme.spacing(5.5),
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

export default function Lobby({ playlist, sendMessage, songs, numberOfSongs, user, host, players }) {
  const classes = useStyles();

  const handleStartGame = (event) => {
    event.preventDefault();
    sendMessage('START_GAME', { song: songs[0].title });
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    sendMessage('CHANGE_NAME', newName);
    e.target.name.value = '';
  };

  return (
    <>
      {playlist && (
        <div className='lobby'>
          <Typography variant='h4' className="playlist-name">{playlist.playlistName.toUpperCase()} PLAYLIST</Typography>
          {/* PLAYLIST DETAILS LEFT SIDE */}
          <div className='lobby-container'>
            <div className='lobby-left'>
              <img src={playlist.playlistPhoto} alt="playlistPhoto"></img>
            </div>

            {/* PLAYLIST DETAILS RIGHT SIDE */}
            <div className='lobby-right'>
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
                      value={'easy'}
                    >
                      <FormControlLabel value='easy' control={<WhiteRadio checked />} label='Easy (30 seconds)' />
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
                    <Typography variant='subtitle1' className={classes.listItem}>Number of Songs: {numberOfSongs}</Typography>
                  </div>
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" className={classes.divider} />
              
              {/* Host */}
              <ListItem >
                <ListItemText>
                  <Typography variant='h5' className={classes.mainHeading}>
                    {/* <Avatar className={classes.icon}><PersonIcon /></Avatar> */}
                    <span>Host</span>
                  </Typography>
                  <Typography variant='subtitle1' className={classes.listItem}>
                    {host.name}
                    {user.id === host.id && <span> (You)</span>}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" className={classes.divider} />
            
              {/* Players */}
              <ListItem >
                <ListItemText>
                  <Typography variant='h5' className={classes.mainHeading}>
                    {/* <Avatar className={classes.icon}><GroupAddIcon /></Avatar> */}
                    <span>Players</span>
                  </Typography>
                  {/* List of Players */}
                  <Typography variant='subtitle1' className={classes.players}>
                    <PlayerList {...{ players, user }} />
                  </Typography>
                  {/* Form to Change Name (if you're a player) */}
                  {user.id !== host.id && (
                    <form className='change-name-form' onSubmit={(event) => handleChangeName(event)}>
                      <input type="text" name="name" className={classes.nameChange} placeholder='Type your updated name here'></input>
                      <Button variant="contained" type='submit' className={classes.nameButton}>Change</Button>
                    </form>
                  )}

                </ListItemText>
              </ListItem>
            </List>

            {/* Start Game Button (only for the host)*/}
            {user.id === host.id && (<Button variant="contained" size="small" className={classes.button} onClick={(event) => handleStartGame(event)}>Start Game</Button>)}
          </div>
          </div>
        </div>
      )}
    </>
  )
}
