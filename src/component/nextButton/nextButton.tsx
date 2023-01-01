import React from 'react'
import './nextButton.css'

type NextButtonProps = {
    onClickNextButton: () => void;
}

export const NextButton: React.FC<NextButtonProps> = props => {
    const onClick = () => {
        props.onClickNextButton();
    }

    return (
        <button className={"nextButton"} onClick={e => onClick()}>
            {"Next ➡️"}
        </button>
    );
}
