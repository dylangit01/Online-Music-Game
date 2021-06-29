import React from 'react';

// Styling
import './AudioPlayer.scss';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    background: 'linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)',
    color: 'white',
    width: 100,
    margin: theme.spacing(1),
  },
  next: {
    color: 'white',
    background: 'linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)',
    opacity: '0.75',
  },
}));

export default function AudioPlayer({ song, nextRound, setRound, sendMessage, user, host }) {
  const classes = useStyles();

  const handleSongEnd = () => {
    setRound((prev) => {
      return { ...prev, finished: true };
    });
    sendMessage('SONG_FINISHED', 'song has finished playing');
  };

  return (
    <div className='audio-player'>
      {/* Audio plays automatically on load, remove controls*/}
      <audio
        id="song-audio"
        autoPlay
        // controls
        onEnded={handleSongEnd} //disable guessing, reveal song if not revealed
        // volume={0.5}
        src={song.previewUrl}
      ></audio>
      {host.id === user.id && (
        <IconButton className={classes.next} onClick={nextRound}>
          <SkipNextIcon fontSize='large' />
        </IconButton>
      )}
      {/* <Button className={classes.button} endIcon={<SkipNextIcon/>} onClick={nextRound}>Next</Button> */}
    </div>
  );
}
