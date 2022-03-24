import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleChangePlace(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddCard({
      name,
      link,
    });
    props.onClose();
  }
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);
  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        id="name-card"
        className="popup__input-text popup__input-text_type_placeName"
        type="text"
        name="placeName"
        onChange={handleChangePlace}
        value={name}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="name-card-error" className="error">
        Вы пропустили это поле
      </span>
      <input
        id="name-link"
        className="popup__input-text popup__input-text_type_placeLink"
        type="url"
        name="placeLink"
        onChange={handleChangeLink}
        value={link}
        placeholder="Ссылка на картинку"
        required
      />
      <span id="name-link-error" className="error">
        Введите адрес сайта
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
