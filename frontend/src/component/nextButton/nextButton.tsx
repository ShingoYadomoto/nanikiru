import React from 'react'
import './nextButton.css'
import {QuestionID} from "../question/question";

export type NextButtonDetail = {
    isActive: boolean;
}

type NextButtonProps = {
    detail: NextButtonDetail
    onClickNextButton: () => void;
}

export const NextButton: React.FC<NextButtonProps> = props => {
    const onClick = () => {
        props.onClickNextButton();
    }

    return (
        <button className={"nextButton " + (props.detail.isActive ? "nextButton-active" : "")} onClick={e => onClick()}>
            {"次の問題へ" + (props.detail.isActive ? "" : " 押せないよ")}
        </button>
    );
}
