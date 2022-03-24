import React from 'react'


function PopupWithForm(props) {

    return (
        <div className={props.isOpen
            ? `popup popup_type_${props.name} popup_opened`
            : `popup popup_type_${props.name}`} >
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} type="button" ></button>
                <h2 className="popup__heading">{props.title}</h2>
                <form className="popup__input popup__input_info" name={`${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit"> {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;