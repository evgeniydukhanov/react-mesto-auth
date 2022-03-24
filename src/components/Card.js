import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = ` ${
    isOwn ? "element__delete" : "element__delete_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `${
    isLiked ? "element__button element__button_active" : "element__button"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__pic"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__caption">
        <p className="element__title">{props.card.name}</p>
        <div className="element__like_area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like_counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
