import React from 'react';
import './TrackList.scss';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';

export default function TrackList({ round, songs }) {
  // setRound(10)
  // const round = 10;
  // if (round === numberOfRounds) {
  //   isFinished =true
  // }

  const albumCovers = songs.map((song) => {
    // get song's index
    const index = songs.indexOf(song);
    // const currentSong = 3;

    const isCurrent = () => {
      if (index === round.number) {
        if (round.finished) {
          return 'tracklist-album-cover--finished';
        } else {
          return 'tracklist-album-cover--current';
        }
      } else if (index > round.number) {
        return 'tracklist-album-cover--next';
      } else {
        return 'tracklist-album-cover--prev';
      }
    };

    // HAVE TO FIND A WAY TO NOT SHOW TOOLTIP FOR SONGS NOT YET PLAYED
    return (
      <div key={song.id} className={`tracklist-album-cover ${isCurrent()}`}>
        {isCurrent() === 'tracklist-album-cover--prev' && (
          <Tooltip
            title={
              <div>
                <strong>{song.title}</strong>
                <br />
                {song.artist}
              </div>
            }
          >
            <img src={song.albumPhoto} alt='cover'></img>
          </Tooltip>
        )}

        {isCurrent() !== 'tracklist-album-cover--prev' && <img src={song.albumPhoto} alt='cover'></img>}

        <span className="question-mark">?</span>

      </div>
    );
  });

  return <div className='tracklist'>{albumCovers}</div>;
}
