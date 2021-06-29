import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Result.scss';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import winnerSound from '../../../assets/winner.mp3';

const useStyles = makeStyles((theme) => ({
  winner: {
    color: 'gold',
  },
  rating: {
    fontWeight: 800,
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
}));

export default function Result({ score, winner }) {
  const classes = useStyles();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [spin, setSpin] = useState('fas fa-sync-alt fa-2x');

  return (
    <div className='result'>
      <audio id='winner-audio' autoPlay src={winnerSound}></audio>
      {winner && (
        <Typography variant='h4' gutterBottom>
          Congrats <span className={classes.winner}>{winner}</span>!
        </Typography>
      )}
      {!winner && (
        <Typography variant='h4' gutterBottom>
          <span className={classes.winner}>You're all Winners!</span>
        </Typography>
      )}

      <Typography variant='h6'>You are the beatmaker of the game!</Typography>
      <img
        className='trophy'
        src='https://github.com/dylangit01/DROP-THE-BEAT/blob/ruby/feature/winner-page/client/public/images/trophy.png?raw=true'
        alt='trophy'
      />
      <p className={classes.rating}>RATING</p>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)} />
              <i
                className='fas fa-star fa-lg'
                style={{ color: ratingValue <= (hover || rating) ? '#FFE227' : '#E4E5E9' }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              ></i>
            </label>
          );
        })}
        <Link to='/'>
          <i
            className={spin}
            style={{ color: spin.includes('fa-spin') ? '#FFE227' : '#E4E5E9' }}
            onMouseEnter={() => setSpin('fas fa-sync-alt fa-2x fa-spin')}
            onMouseLeave={() => setSpin('fas fa-sync-alt fa-2x')}
          ></i>
        </Link>
      </div>
    </div>
  );
}
