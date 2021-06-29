import React, { useEffect, useState, useContext } from 'react';

import './Game.scss';

import { io } from 'socket.io-client';

import Lobby from './Lobby/Lobby';
import GameInProgress from './GameInProgress/GameInProgress';
import Result from './Result/Result';

import { DTBContext } from '../../contextAPI/DTBContext';

export default function Game({ playlist }) {
  const [conn, setConn] = useState(undefined);
  const [gameStatus, setGameStatus] = useState({ started: false, finished: false, winner: null }); // ASK IF THERE'S A WAY TO STORE STATUS LIKE THIS
  const [user, setUser] = useState({}); // Specific to person using website
  const [users, setUsers] = useState([]); // All users connected through socket
  const [guesses, setGuesses] = useState([]); //add boolean correct: true/false
  const [round, setRound] = useState({ number: 0, finished: false, winner: null });


  // Keep track of the number of rounds for a game based on the number of songs in the selected playlist
  const songs = playlist.songs;
  const song = songs[round.number];
  const numberOfRounds = songs.length;

  ////////////////////////////////////////////////////
  // UPDATES AT THE END OF EVERY ROUND
  ////////////////////////////////////////////////////
  useEffect(() => {
    // Checking if it's the last round
    if (round.number === numberOfRounds) {
      // check highest score for winner and set winner
      const winner = getWinner();
      setGameStatus((prev) => ({ ...prev, finished: true, winner }));
    }
  }, [numberOfRounds, round]);

  ////////////////////////////////////////
  // ON INITIAL SOCKET CONNECTION
  ////////////////////////////////////////
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const baseURL = 'https://drop-the-beat-app.herokuapp.com';
      // const connection = io('http://localhost:3001');
      const connection = io(`${baseURL}`);
      setConn(connection);
    }
    return () => (mounted = false);
  }, []);

  ////////////////////////////////////////
  // RECEIVING MESSAGES FROM THE SERVER
  ////////////////////////////////////////
  useEffect(() => {
    // BACK FROM SERVER (conn.on = waiting for msg)
    let mounted = true;
    if (mounted) {
      if (conn) {
        // Received only by one user on connecting to socket
        conn.on('INITIAL_CONNECTION', (msg) => {
          const { id, name, color, score, users, isHost } = msg;
          setUser({ id, name, color, score, isHost });
          setUsers([...users]);
        });

        // Received by all users except user who connected
        conn.on('NEW_USER', (msg) => {
          setUsers((prev) => [...prev, msg]);
        });

        // Received only by one user who requested name change
        conn.on('CHANGE_NAME', (msg) => {
          const { name, color, users } = msg;
          setUser((prev) => ({ ...prev, name, color }));
          setUsers([...users]);
        });

        // Received by all users except user who requested name change
        conn.on('USER_NAME_CHANGE', (msg) => {
          const { users } = msg;
          setUsers([...users]);
        });

        // Received only by one user who got correct score
        conn.on('UPDATE_USER_SCORE', (msg) => {
          const { score } = msg;
          setUser((prev) => ({...prev, score})); 
        });
        ////////////////////////////////////////
        // EVENTS RECEIVED BY ALL USERS
        ////////////////////////////////////////

        // On start game message from the server
        conn.on('START_GAME', (msg) => {
          setGameStatus((prev) => ({ ...prev, started: true }));
        });

        conn.on('CORRECT_GUESS', (msg) => {
          setGuesses((prev) => [...prev, msg]);
          setUsers([...msg.users]);
          setRound((prev) => ({ ...prev, finished: true, winner: msg.name }));

        });

        conn.on('INCORRECT_GUESS', (msg) => {
          setGuesses((prev) => [...prev, msg]);
        });

        conn.on('NEXT_ROUND', (msg) => {
          // Update round state to next round and set the round finished status to false
          setRound((prev) => {
            return { ...prev, number: prev.number + 1, finished: false, winner: null };
          });
        });

        conn.on('DISCONNECT_USER', (msg) => {
          console.log(msg);
          setUsers((prev) => {
            const copy = [...prev];
            const names = copy.map((user) => user.name);
            const index = names.indexOf(msg.name);
            if (index !== -1)
              // if found
              copy.splice(index, 1);
            return copy;
          });
        });
      }
    }
    return () => (mounted = false);
  }, [conn]);

  ////////////////////////////////////////
  // SEND MESSAGE TO SERVER
  ////////////////////////////////////////
  const sendMessage = (type, msg) => {
    const payload = { ...user, msg };
    conn.emit(type, payload);
  };

  ////////////////////////////////////////
  // NEW ROUND FUNCTION
  ////////////////////////////////////////
  const nextRound = () => {
    // Get the current song name if it exists (new JS syntax)
    const nextRound = round.number + 1;
    const currentSongName = songs[nextRound]?.title;

    // Send message to socket to notify all users it's the next round and update the next song name
    sendMessage('NEXT_ROUND', currentSongName);
  };

  ////////////////////////////////////////
  // GET WINNER FUNCTION
  ////////////////////////////////////////
  const getWinner = () => {
    let winner = '';
    let highestScore = 0;

    // Assume only 2 players
    players.forEach((user) => {
      if (user.score > highestScore) {
        winner = user.name;
        highestScore = user.score;
      } else if (user.score === highestScore) {
        winner = ''; // this means it's a tie or no one scored
      }
    });
    return winner;
  };

  // find a host
  const host = users.find((user) => user.isHost === true) || {};

  // array of only players excluding the host
  // Using context to update players, which messageInput component needs host info:
  const { players, setPlayers } = useContext(DTBContext);

  // FAKE ROOM SETUP: Only two players will show up in the game room,
  useEffect(() => {
    const getPlayers = () => {
      setPlayers(users.slice(1, 3));
    };
    getPlayers();
  }, [setPlayers, users]);

  return (
    <div className='game'>
      {/* PRE-GAME LOBBY */}
      {!gameStatus.started && (
        <Lobby
          playlist={playlist}
          sendMessage={sendMessage}
          songs={songs}
          numberOfSongs={numberOfRounds}
          playlistName={playlist.playlistName}
          user={user}
          users={users}
          host={host}
          players={players}
        />
      )}

      {/* GAME IN PROGRESS */}
      {gameStatus.started && !gameStatus.finished && (
        <GameInProgress
          nextRound={nextRound}
          round={round}
          setRound={setRound}
          numberOfRounds={numberOfRounds}
          playlist={playlist}
          song={song}
          user={user}
          users={users}
          host={host}
          players={players}
          messages={guesses}
          sendMessage={sendMessage}
        />
      )}

      {/* GAME-END RESULT */}
      {gameStatus.finished && <Result winner={gameStatus.winner} playlistName={playlist.playlistName} />}

    </div>
  );
}
