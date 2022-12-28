import React from 'react'
import './nextButton.css'

export type NextButtonDetail = {
    isActive: boolean;
}

type NextButtonProps = {
    detail: NextButtonDetail
}

export const NextButton: React.FC<NextButtonProps> = props => {
    return (
        <button className={"nextButton " + (props.detail.isActive ? "nextButton-active" : "")}>
            次の問題へ
        </button>
    );
}
