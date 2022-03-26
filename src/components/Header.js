import React from 'react';
import headerLogo from '../images/headerlogo.svg';
import { Link, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <Route path="/sign-up">
      <Link className="auth__redirectLink" to='/sign-in'>Войти</Link>
      </Route>
      <Route path="/sign-in">
      <Link className="auth__redirectLink" to='/sign-up'>Регистрация</Link>
      </Route>
      <ProtectedRoute exact path="/">
      <Link className="auth__redirectLink" to='/sign-in'>Выйти</Link>
      </ProtectedRoute>
    </header>
  );
};

export default Header;