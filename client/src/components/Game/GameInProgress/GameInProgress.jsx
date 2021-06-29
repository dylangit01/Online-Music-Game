import React, { useState, useEffect } from 'react';
import Chat from '../Chat/Chat';
import Score from '../Score/Score';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import TrackList from '../TrackList/TrackList';
import './GameInProgress.scss';
import MessageInput from '../Chat/MessageInput/index'

export default function GameInProgress({ playlist, nextRound, song, round, setRound,user, users, messages, sendMessage, host, players}) {

  const [counter, setCounter] = useState(3);
  
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (

    <div className='game-in-progress'>

      <div className='left-side'>

        {counter !== 0 && (
          <div className="countdown">
            <span>{counter}</span>
          </div>
        )}

        {counter === 0 && (
          <>
            {song && (
              <div className="music-player">
                <MusicPlayer
                  round={round}
                  setRound={setRound}
                  playlist={playlist}
                  song={song}
                  nextRound={() => nextRound()}
                  sendMessage={sendMessage}
                  user={user}
                  host={host}
                  players={players}
                />
              </div>
            )}
            <TrackList round={round} songs={playlist.songs} />
          </>
        )}

      </div>

      <div className='right-side'>
        <Score {...{ user, players, messages }} />
        <Chat {...{ user, users, messages }} />
        <MessageInput onSubmit={sendMessage} host={host} user={user} />
      </div>
    </div>
  );
}
