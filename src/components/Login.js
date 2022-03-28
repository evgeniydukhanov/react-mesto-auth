import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmitLogin(e) {
    e.preventDefault();
    props.onSubmit({ password, email });
  }
  return (
    <section className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmitLogin}>
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
        />
        <button className="auth__submit" type="submit">
          {props.buttonText}
        </button>
      </form>
    </section>
  );
}

export default Login;
