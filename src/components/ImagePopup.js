import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.card.name || props.card.link !== ""
          ? "popup popup_type_pic popup_opened"
          : "popup popup_type_pic"
      }
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__pic-container">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <img
          className="popup__big-picture"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__pic-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
