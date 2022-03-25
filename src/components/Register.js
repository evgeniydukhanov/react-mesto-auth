import React from "react";

function Register(props) {
  return (
    <section className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form className="auth__form">
        <input
          className="auth__input"
          required
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="auth__input"
          required
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <button
         className="auth__submit"
         type="submit"
        >
         {props.buttonText}
        </button> 
      </form>
      <a href="#" className="auth__redirectLink">Уже зарегистрированы? Войти</a>
    </section>
  );
}

export default Register;
