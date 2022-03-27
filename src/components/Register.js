import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmitRegistration(e) {
    e.preventDefault();
    props.onSubmit({email,password})
  }
  return (
    <section className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmitRegistration}>
        <input
          className="auth__input"
          required
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          value={email}
        />
        <input
          className="auth__input"
          required
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChangePassword}
          value={password}
          minLength="8"
          maxLength="16"
        />
        <button
          className="auth__submit"
          type="submit"
        >
          {props.buttonText}
        </button>
      </form>
      <Link to="/sign-in" className="auth__redirectLink">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;
