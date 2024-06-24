import { useUnit } from 'effector-react';
import { $username, $auth } from '../context/auth';
import { useTheme } from '../hooks';
import { removeUser } from '../utils/auth';

export const Header = () => {
  const userName = useUnit($username);
  const { switchTheme, theme } = useTheme();
  const loggedIn = useUnit($auth);

  return (
    <header className={`navbar navbar-dark bg-${theme === 'dark' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 style={{ color: 'white' }}>Costs App</h1>
        {userName.length ? <h2 style={{ color: 'white' }}>{userName}</h2> : ''}
        <button
          onClick={switchTheme}
          className={`btn btn-theme btn-${theme === 'dark' ? 'light' : 'dark'}`}>
          {theme === 'dark' ? 'Go light' : 'Go dark'}
        </button>
        {loggedIn && (
          <button onClick={removeUser} className="btn btn-logout btn-primary">
            Выход
          </button>
        )}
      </div>
    </header>
  );
};
