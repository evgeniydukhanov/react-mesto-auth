import React from 'react';
import headerLogo from '../images/headerlogo.svg';
import { Link, Route } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Header({onSignOut}) {
  const {email} = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <Route path="/sign-up">
        <Link className="auth__redirectLink" to='/sign-in'>Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="auth__redirectLink" to='/sign-up'>Регистрация</Link>
      </Route>
      <Route exact path="/">
        <div>
        <p className="header__info" style={{color:'white'}} >{email} </p>
        <Link className="auth__redirectLink" to='/sign-in' onClick={onSignOut}> Выйти </Link>
        </div>
      </Route>
    </header>
  );
};

export default Header;