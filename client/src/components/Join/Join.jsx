import React, { useState } from 'react';
import './Join.scss';
import { Route, Link } from 'react-router-dom';
import Game from '../Game/Game';

export default function Join() {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(emoji);
  };

  return (
    <div className='lobby'>
      <h1>Join and players form is here</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor='name'>
          {' '}
          Enter your name:
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Type your name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <br />
        <label htmlFor='emoji'>
          Choose your emoji:
          <select id='emoji' name='emoji' value={emoji} onChange={(event) => setEmoji(event.target.value)}>
            <option value='monkey'>&#128053;</option>
            <option value='octopus'>&#128025;</option>
            <option value='ruby'>&#128142;</option>
            <option value='worm'>&#128027;</option>
            <option value='bug'>&#128030;</option>
          </select>
        </label>
        <br /> <br />
        <input type='submit' value='Set states' />
        <Link to='/game'>
          <input type='submit' value='Join the game' /> <br />
        </Link>
        <Route path='/game' exact>
          <Game name={name} emoji={emoji} />
        </Route>
      </form>
      <br />
    </div>
  );
}
