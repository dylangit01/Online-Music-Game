const express = require('express');
const router = express.Router();
const { getSongsByPlaylists } = require('../helpers/dataHelpers');

module.exports = ({ getPlaylistsSongs }) => {
  router.get('/', (req, res) => {
    // Currently this gets all the songs for user 1 hardcoded
    getPlaylistsSongs(1)
      .then((playlistsSongs) => {
        const formattedSongs = getSongsByPlaylists(playlistsSongs);
        res.json(formattedSongs);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
