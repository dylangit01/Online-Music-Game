import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

import './index.scss';

const MessageInput = (props) => {
  const onSubmit = (evt) => {
    evt.preventDefault();
    const guess = evt.target.message.value.trim();

    // Only send guess/message to the back if it's not an empty input
    guess && props.onSubmit('SEND_MESSAGE', guess);

    // Reset guess/message field
    evt.target.message.value = '';
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      background: 'linear-gradient(45deg, #9e66f2 30%, #2162f3 90%)',
      color: 'white',
      width: 120,
      height: 40,
      position: 'absolute',
      right: 0,
      borderRadius: '10',
      display: 'none',
    },
    input: {
      color: '#fff',
    },
    send: {
      color: 'white',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  }));

  const classes = useStyles();

  // can we disable send option if it's an empty input?
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
      className="messageInput"
    >
      <div className="chat-input-box">
        <input
          className="chat-input"
          type="text"
          name="message"
          placeholder="Type your guess/message"
        />
        <Button className={classes.button} type="submit">
          Send!
        </Button>
        <IconButton type="submit" className={classes.send} aria-label="send">
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default MessageInput;
