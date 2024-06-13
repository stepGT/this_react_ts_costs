import { useUnit } from 'effector-react';
import { $username } from '../context/auth';
import { useTheme } from '../hooks';

export const Header = () => {
  const userName = useUnit($username);
  const { switchTheme, theme } = useTheme();

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
      </div>
    </header>
  );
};
