import './user-info.css';

function UserInfo({ user }) {
  return (
    <div className="user__info">
      <h2 className="subtitle">Личные данные</h2>
      <p className="user__info-text">{user.firstName}</p>
      <p className="user__info-text">{user.email}</p>
    </div>
  );
}

export { UserInfo };
