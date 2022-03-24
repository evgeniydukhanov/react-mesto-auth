import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
    props.onClose();
  }

  React.useEffect(() => {
    if (currentUser) setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="info"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input-text popup__input-text_type_name"
        type="text"
        name="name"
        value={name || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span id="input-name-error" className="error">
        Вы пропустили это поле
      </span>
      <input
        id="input-workplace"
        className="popup__input-text popup__input-text_type_workplace"
        type="text"
        name="about"
        value={description || ""}
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span id="input-workplace-error" className="error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
