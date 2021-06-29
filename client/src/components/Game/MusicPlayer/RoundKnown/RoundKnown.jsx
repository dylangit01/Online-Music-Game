import React from 'react';
import './RoundKnown.scss';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '25vw',
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

export default function RoundKnown({ song }) {
  const classes = useStyles();

  return (
    <div className='round-known'>
      <img className={classes.cover} src={song.albumPhoto} alt='cover'></img>
      <div className={classes.overlay}>
        <Typography variant='h4'>{song.title}</Typography>
        <Typography variant='h6'>{song.artist}</Typography>
      </div>
    </div>
  );
}
