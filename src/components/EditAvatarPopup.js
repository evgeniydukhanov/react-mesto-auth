import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState({ avatar: '' })

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    props.onClose();
  }
  function onChange(e) {
    setErrorMessage({ [e.target.name]: e.target.validationMessage })
  }
  React.useEffect(() => {
    avatarRef.current.value = "";
    setErrorMessage({ avatar: '' })
  }, [props.isOpen]);

  const isDisable = () => errorMessage.avatar || avatarRef.current?.value === ''
  

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isDisable={isDisable()}
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
        onChange={onChange}
      />
      <span id="avatar-link-error" className={`error ${errorMessage && 'error_visible'}`}>
        {errorMessage.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
