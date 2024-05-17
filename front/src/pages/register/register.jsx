import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { path } from "../../const";
import "./register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    try {
      if (!name || !email || !password) {
        alert("Заполните данные!");
        return;
      }

      setIsLoading(true);

      const responce = await axios.post("http://localhost:3001/auth/register", {
        firstName: name,
        lastName: name,
        email,
        password,
        phone: "123",
      });
      if (responce.status === 200) {
        window.localStorage.setItem("token", responce.data.token);
        navigate(path.user);
      }
    } catch (error) {
      console.log(error);
      alert("Не удалось зарегистрироваться");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="register">
      <h1 className="title">Регистрация</h1>
      <form
        className="register__form"
        onSubmit={(event) => {
          event.preventDefault();
          register();
        }}
      >
        <input
          type="text"
          className="register__input"
          placeholder="Имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          className="register__input"
          placeholder="Электронная почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          className="register__input"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">Уже зарегистрированы?</p>
      <Link className="register__link" to={path.login}>
        Авторизация
      </Link>
    </div>
  );
}

export { Register };
