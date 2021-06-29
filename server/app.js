const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const playlistsRouter = require('./routes/playlists');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/playlists', playlistsRouter(dbHelpers));

module.exports = app;
