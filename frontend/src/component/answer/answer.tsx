import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './answer.css'
import {isBooleanObject} from "util/types";

export type AnswerDetail = {
    userAnswer: PaiDetail;
    correctAnswer: PaiDetail[];
}

type AnswerProps = {
    detail: AnswerDetail;
}

export const Answer: React.FC<AnswerProps> = props => {
    const isCorrect = (userAnswer: PaiDetail, correctAnswer: PaiDetail) => {
        return userAnswer.type === correctAnswer.type &&
            userAnswer.index === correctAnswer.index &&
            userAnswer.isBonus === correctAnswer.isBonus
    }

    let correct = false
    for (const correctAnswer of props.detail.correctAnswer) {
        correct = isCorrect(props.detail.userAnswer, correctAnswer)
        if (correct) {
            break
        }
    }

    const correctAnswers = props.detail.correctAnswer.map((fc, idx) => {
        return (
            <Pai detail={fc} />
        );
    });

    return (
        <>
            <div>{correct ? "○" : "×"}</div>
            <div>あなたの回答: <Pai detail={props.detail.userAnswer} /></div>
            <div>正解: {correctAnswers}</div>
        </>
    );
}
