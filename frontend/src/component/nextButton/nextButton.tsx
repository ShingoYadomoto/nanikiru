import React from 'react'
import './nextButton.css'

export type NextButtonDetail = {
    isActive: boolean;
}

type NextButtonProps = {
    detail: NextButtonDetail
    onClickNextButton: () => void;
}

export const NextButton: React.FC<NextButtonProps> = props => {
    const onClick = () => {
        if (props.detail.isActive) {
            props.onClickNextButton();
        }
    }

    return (
        <button className={"nextButton " + (props.detail.isActive ? "nextButton-active" : "")} onClick={e => onClick()}>
            {"次の問題へ" + (props.detail.isActive ? "" : " 押せないよ")}
        </button>
    );
}
