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
import { Route, Redirect,Switch} from 'react-router-dom';
import Login from './Login'



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState('')
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const propsMain ={
    onEditProfile:handleEditProfileClick,
    onAddPlace:handleAddPlaceClick,
    onEditAvatar:handleEditAvatarClick,
    onCardClick:handleCardClick,
    onCardLike:handleCardLike,
    onCardDelete:handleCardDelete,
    cards:cards
  }
  React.useEffect(() => {
    api.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => `Не удалось получить карточки с сервера : ${err}`)
  }, []);


  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])

      .then(([cards, userInfo]) => {
        setCurrentUser(userInfo);
        setCards(cards)
      })
      .catch(err => `Данные пользователя не получены : ${err}`)
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.cardLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      });
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
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' })
  }
  function handleCardClick(cardInfo) {
    setSelectedCard({ name: cardInfo.name, link: cardInfo.link });
  }
  function handleUpdateUser(currentUser) {
    api.patchUserInfo({ name: currentUser.name, about: currentUser.about })
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch(err => `Не обновился профиль ${err}`)
  }
  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch(err => `Не удалось обновить аватар ${err}`)
  }
  function handleAddCard({ name, link }) {
    api.addCard({name, link} )
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .catch(err => `не удалось добавить карточку ${err}`)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
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
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Switch>

          <Route exact path ="/">
          {loggedIn ? <Main {...propsMain}/> : <Redirect to="/sign-in"/>}
          </Route>

          <Route path="/sign-in">
          <Login
          buttonText="Войти"/>
          </Route>

          <Route path="/sign-up">
          </Route>
          
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
