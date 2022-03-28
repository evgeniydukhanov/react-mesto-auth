import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    props.onClose();
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        className="popup__input-text popup__input-text_type_avatarLink"
        type="url"
        name="avatar"
        defaultValue=""
        placeholder="Ссылка на изображение"
        required
      />
      <span id="avatar-link-error" className="error">
        Введите адрес сайта
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
