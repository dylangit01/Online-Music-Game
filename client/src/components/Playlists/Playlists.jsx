import React from 'react';
import Playlist from './Playlist/Playlist';

// Styling
import './Playlists.scss';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(6),
  },
}));

export default function Playlists({ playlists }) {
  const classes = useStyles();

  const playlist = playlists.map((playlist) => {
    return (
      <Grid key={playlist.playlistId} item xs={12} sm={6} md={3}>
        <Playlist
          key={playlist.playlistId}
          id={playlist.playlistId}
          name={playlist.playlistName}
          image={playlist.playlistPhoto}
          rating={playlist.playlistRating}
        />
      </Grid>
    );
  });

  return (
    <div className="playlists">
      <Typography variant="h4" className="heading">SELECT A PLAYLIST</Typography>
      <Grid
        container
        // spacing={4}
        className={classes.gridContainer}
        justify='center'
      >
        {playlist}
      </Grid>
    </div>
  );
}

// MINOR STYLING ISSUES: WHY THE BACKGROUND COVER LOOKS A BIT DIFFERENT AND THERE'S SCROLL?
