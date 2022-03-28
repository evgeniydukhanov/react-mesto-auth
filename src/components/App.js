import React from 'react'
import Header from './Header';
import Main from './Main';
import '../index.css';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import InfoToolTip from './InfoToolTip';
import successRegistration from "../images/Union.png"
import unSuccessRegistration from "../images/Union2.png"
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {defaultUser} from '../utils/constants';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState(defaultUser)
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [messageTooltip, setMessageTooltip] = React.useState({})
  const [isDeletePopupOpen, setisDeletePopupOpen] = React.useState(false)
  const [isDeleteCard, setIsDeleteCard]= React.useState('')
  const propsMain = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    onCardLike: handleCardLike,
    onConfirmDelete: handleDeletePopupOpen,
    cards: cards
  }
  const history = useHistory();

  React.useEffect(() => {
    checkTocken();
    if(loggedIn)
    Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cards, userInfo]) => {
        setCurrentUser({ ...currentUser, ...userInfo });
        setCards(cards)
      })
      .catch(err => `Данные пользователя не получены : ${err}`)
  }, [loggedIn]);
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.cardLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  function handleCardDelete() {
    api.deleteCard(isDeleteCard)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== isDeleteCard))
      })
      .catch((err)=> console.log(err))
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePopupOpen(card) {
    setisDeletePopupOpen(true);
    setIsDeleteCard(card._id)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' })
    setIsTooltipPopupOpen(false);
    setisDeletePopupOpen(false)
  }
  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
  }
  function handleUpdateUser(user) {
    api.patchUserInfo(user)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, ...userInfo })
      })
      .catch(err => `Не обновился профиль ${err}`)
  }
  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, ...userInfo })
      })
      .catch(err => `Не удалось обновить аватар ${err}`)
  }
  function handleAddCard({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .catch(err => `не удалось добавить карточку ${err}`)
  }
  function onHandleSubmitRegistration(data) {
    auth.registration(data)
      .then(({ email }) => {
        setCurrentUser({ ...currentUser, email })
        history.push("/sign-in")
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Вы успешно зарегистрировались!", img: successRegistration })
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: unSuccessRegistration })

      })
  }
  function onHandleSubmitAuthorization(data) {
    auth.authorization(data)
      .then(({ token }) => {
        localStorage.setItem('jwt', token)
        setLoggedIn(true)
        history.push('/')
       
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: unSuccessRegistration })

      })
  }
  function checkTocken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true)
      auth.getUser(jwt)
        .then(({ data: { email } }) => {
          setCurrentUser({ ...currentUser, email })
        })
        .catch((err)=> console.log(err))
    }
  }
  function signOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            onSignOut={signOut} />
          <Switch>
            <ProtectedRoute loggedIn={loggedIn} exact path="/" component={Main} propsMain={propsMain} />
            <Route path="/sign-in">
              {loggedIn ? <Redirect to='/' /> : <Login
                onSubmit={onHandleSubmitAuthorization}
                buttonText="Войти"
              />}
            </Route>
            <Route path="/sign-up">
              {loggedIn ? <Redirect to='/' /> : <Register
                onSubmit={onHandleSubmitRegistration}
                buttonText="Зарегистрироваться"
              />}
            </Route>
            <Route path="*">
              <Redirect to='/sign-in' />
            </Route>
          </Switch>
        </div>
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddCard={handleAddCard}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title='Вы уверены?'
          name='element'
          buttonText='Да'
        >
        </PopupWithForm>
        <InfoToolTip
          name="infotooltip"
          isOpen={isTooltipPopupOpen}
          messageTooltip={messageTooltip}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
        title="Вы уверены?"
        onClose={closeAllPopups}
        handleCardDelete={handleCardDelete}
        name='confirmDelete'
        buttonText='Да'
        isOpen={isDeletePopupOpen}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
