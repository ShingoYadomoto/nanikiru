import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './answer.css'

export type AnswerDetail = {
    page: number;
    isCorrect: boolean;
    userAnswer: PaiDetail;
    correctAnswer: PaiDetail[];
}

type AnswerProps = {
    detail: AnswerDetail;
}

export const Answer: React.FC<AnswerProps> = props => {
    const correctAnswers = props.detail.correctAnswer.map((fc, idx) => {
        return (
            <Pai detail={fc} onPaiSelected={selected => {}}/>
        );
    });

    const resultImageFile = props.detail.isCorrect ? "correct" : "incorrect"
    const resultImage = `${process.env.PUBLIC_URL}/img/${resultImageFile}.png`;

    return (
        <>
            <span>
                <img className={"correctOrNot"} src={resultImage} alt="正誤" ></img>
            </span>
            <span>回答:</span>
            <span><Pai detail={props.detail.userAnswer} onPaiSelected={selected => {}}/></span>
            <span>正解:</span>
            <span>{correctAnswers}</span>
            <span>P.{props.detail.page}</span>
        </>
    );
}
