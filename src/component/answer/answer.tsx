import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './answer.css'

export type AnswerDetail = {
    page: number;
    isCorrect: boolean;
    userAnswer: PaiDetail;
    correctAnswer: PaiDetail[];
    comment: string;
}

type AnswerProps = {
    detail: AnswerDetail;
}

export const Answer: React.FC<AnswerProps> = props => {
    const correctAnswers = props.detail.correctAnswer.map((fc, idx) => {
        return (
            <Pai detail={fc} onPaiSelected={selected => {}} key={idx}/>
        );
    });

    const resultImageFile = props.detail.isCorrect ? "correct" : "incorrect"
    const resultImage     = `${process.env.PUBLIC_URL}/img/${resultImageFile}.png`;
    const commentaryImage = `${process.env.PUBLIC_URL}/img/check.png`;

    return (
        <>
            <div className={"answer"}>
                <span>
                    <img className={"correctOrNot"} src={resultImage} alt="正誤" ></img>
                </span>
                <span>回答:</span>
                <span><Pai detail={props.detail.userAnswer} onPaiSelected={selected => {}}/></span>
                <span>正解:</span>
                <span>{correctAnswers}</span>
            </div>
            <div className={"commentary"}>
                <img className={"commentaryImg"} src={commentaryImage} alt="check" ></img>
                P.{props.detail.page} {props.detail.comment}
            </div>
        </>
    );
}
