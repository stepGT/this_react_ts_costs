import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { AuthClient } from '../../API/authClient';
import { setAlert } from '../../context/alert';
import { Spinner } from '../Spinner/Spinner';

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const currentAuthTitle = type === 'login' ? 'Войти' : 'Регистрация';

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) return;

    const result = await AuthClient.login(username, password);

    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate('/costs');
    setAlert({ alertText: 'Вход выполнен', alertStatus: 'success' });
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) return;
    if (password.length < 4) return;

    const result = await AuthClient.registration(username, password);

    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate('/login');
    setAlert({ alertText: 'Регистрация выполнена', alertStatus: 'success' });
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case 'login':
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case 'registration':
        handleRegistration(usernameRef.current.value, passwordRef.current.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form onSubmit={handleAuth} className="form-group">
        <label className="auth-label">
          Введите имя пользователя
          <input ref={usernameRef} type="text" className="form-control" />
        </label>

        <label className="auth-label">
          Введите пароль
          <input ref={passwordRef} type="password" className="form-control" />
        </label>

        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === 'login' ? (
        <div>
          <span className="question_text">Еще нет аккаунта?</span>
          <Link to={'/registration'}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className="question_text">Уже есть аккаунт?</span>
          <Link to={'/login'}>Войти</Link>
        </div>
      )}
    </div>
  );
};
