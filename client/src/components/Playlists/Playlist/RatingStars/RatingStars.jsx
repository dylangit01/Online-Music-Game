import React from 'react';

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <i key={i} className='fas fa-star' style={{ color: '#FFE227' }}>
          &nbsp;
        </i>
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <i key={i} className='fas fa-star-half-alt' style={{ color: '#FFE227' }}>
          &nbsp;
        </i>
      );
    } else {
      stars.push(
        <i key={i} className='far fa-star' style={{ color: '#FFE227' }}>
          &nbsp;
        </i>
      );
    }
  }
  return <div>{stars}</div>;
};

export default RatingStars;
