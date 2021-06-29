module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (username, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [username, email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUsersPlaylists = (userId) => {
    const query = {
      text: `SELECT users.id as user_id, username, email, playlists.id as playlist_id, name as playlist_name, image_url, rating
        FROM users
        INNER JOIN playlists
        ON users.id = playlists.user_id
        WHERE users.id = $1`,
      values: [userId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getPlaylistsSongs = (userId) => {
    const query = {
      text: `SELECT playlists.id as playlist_id, playlists.name as playlist_name, image_url, rating, songs.id as song_id, songs.*
        FROM playlists 
        JOIN playlists_songs ON playlists.id = playlist_id 
        JOIN songs ON song_id = songs.id 
        WHERE user_id = $1`,
      values: [userId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPlaylists,
    getPlaylistsSongs,
  };
};
