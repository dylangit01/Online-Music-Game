import './PlayerList.scss';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const PlayerList = ({ players, user }) => {
  return (
    <ul style={{ padding: '0', marginTop: '5px' }}>
      {players.map((player, id) => (
        <div key={id} className="player-list">
          <li style={{ listStyleType: 'none', display: 'flex' }}>
            <span>
              <MusicNoteIcon style={{ color: player.color }} />
            </span>
            {player.name}
            {user.id === player.id && <span>&nbsp;(You)</span>}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default PlayerList;
