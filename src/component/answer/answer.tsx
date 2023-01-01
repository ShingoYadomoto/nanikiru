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

    return (
        <>
            <span>{props.detail.isCorrect ? "○" : "×"}</span>
            <span>回答: <Pai detail={props.detail.userAnswer} onPaiSelected={selected => {}}/></span>
            <span>正解: {correctAnswers}</span>
            <span>P.{props.detail.page}</span>
        </>
    );
}
