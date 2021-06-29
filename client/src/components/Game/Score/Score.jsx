import './Score.scss';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';


export default function Score({ setScore, setWinner, user, players, messages }) {
  const useStyles = makeStyles((theme) => ({
    player: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }));

  const classes = useStyles();

  return (
    <div className='score-box'>

      {/* 1st player */}
      {players[0] && (
        <div className='scoreDetail'>
          <Typography variant='h3'>{players[0].score}</Typography>
          <div className={classes.player} style={{ color: players[0].color }}>
            <MusicNoteIcon />
            <strong>{players[0].name}</strong>
          </div>
        </div>
      )}

      {/* VS */}
      {players.length >= 2 && (<Typography variant='h4' className='versus'>VS</Typography>)}

      {/* 2nd player */}
      {players[1] && (
        <div className='scoreDetail'>
          <Typography variant='h3'>{players[1].score}</Typography>
          <div className={classes.player} style={{ color: players[1].color }}>
            <MusicNoteIcon />
            <strong>{players[1].name}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
