import './Chat.scss';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import { makeStyles } from '@material-ui/styles';

const MessageList = ({ messages, users }) => {
  const useStyles = makeStyles((theme) => ({
    '@keyframes bingo': {
      '0%': {},
      '50%': {},
      '100%': {
        transform: 'scale(1.2, 1.2)',
      },
      '30%': {},
      '80%': {
        transform: 'scale(1, 1)',
      },
    },
    musicIcon: {
      height: '90%',
    },
    bingo: {
      animation: '$bingo 1s ease 0s 6',
    },
  }));

  const getUsernameForMsg = (users, msg) => {
    const user = users.find((user) => user.id === msg.id);
    if (user) {
      return user.name;
    }
  };

  const classes = useStyles();
  // const randomColorArr = [
  //   '#e1701a',
  //   '#98acf8',
  //   '#a6f6f1',
  //   '#ffcb74',
  //   '#ff8474',
  //   '#00ead3',
  //   '#77acf1',
  //   '#efbbcf',
  //   '#f54748',
  //   '#7868e6',
  //   '#f7fd04',
  //   '#ff0004',
  //   '#033fff',
  // ];
  return (
    <ul className="message-list">
      {/* {randomColorArr.map((color, id) => {
        return <li style={{ color }}>RubyOffTheRails</li>;
      })} */}
      {messages.map((msg, idx) => (
        <li key={idx} className="message-list-item">
          <MusicNoteRoundedIcon
            style={{ color: msg.color }}
            className={classes.musicIcon}
          ></MusicNoteRoundedIcon>
          <b style={{ color: msg.color }}>
            {getUsernameForMsg(users, msg)}: &nbsp;{' '}
          </b>
          {msg.msgColor === '#54e346' ? (
            <b style={{ color: msg.msgColor }} className={classes.bingo}>
              {msg.msg}
            </b>
          ) : (
            <b style={{ color: msg.msgColor }}>{msg.msg}</b>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
