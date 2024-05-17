import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { path } from '../../const';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function login() {
    try {
      if (!email || !password) {
        alert('Заполните данные!');
        return;
      }

      setIsLoading(true);

      const responce = await axios.post(
        'http://localhost:3001/auth/login',
        {
          email,
          password,
        }
      );
      if (responce.status === 200) {
        window.localStorage.setItem('token', responce.data.token);
        navigate(path.user);
      }
    } catch (error) {
      console.log(error);
      alert('Не удалось авторизоваться');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login">
      <h1 className="title">Авторизация</h1>
      <form
        className="login__form"
        onSubmit={(event) => {
          event.preventDefault();
          login();
        }}
      >
        <input
          type="text"
          className="login__input"
          placeholder="Электронная почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          className="login__input"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
      <p className="login__text">Еще не зарегистрированы?</p>
      <Link className="login__link" to={path.register}>
        Регистрация
      </Link>
    </div>
  );
}

export { Login };
