import './Chat.scss';

const UserList = ({ players, user }) => {
  return (
    <>
      {players && (
        <ul style={{ padding: '5px', marginTop: '5px' }}>
          {players.map((player, idx) => (
            <div key={idx} className="user-list">
              <li style={{ listStyleType: 'none' }}>
                {player.name}
                {user.id === player.id && <span>(You)</span>}
                <span style={{ backgroundColor: player.color }}>_</span>
              </li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;
