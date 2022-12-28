import React from 'react'
import {Hand, HandDetail} from '../hand/hand'
import {Answer, AnswerDetail} from '../answer/answer'
import {NextButton, NextButtonDetail} from "../nextButton/nextButton";
import {PaiDetail} from "../pai/pai";

type QuestionState = {
    hand: HandDetail;
    answer: AnswerDetail;
    button: NextButtonDetail;
}

class Question extends React.Component<{}, QuestionState> {
    constructor(props: {}) {
        super(props);

        // Samples //
        const paiList: PaiDetail[] = [
            {type: "m", index: 5, isFolou: false, isBonus: false,},
            {type: "m", index: 6, isFolou: false, isBonus: false,},
            {type: "p", index: 5, isFolou: false, isBonus: false,},
            {type: "p", index: 6, isFolou: false, isBonus: false,},
            {type: "p", index: 8, isFolou: false, isBonus: false,},
            {type: "p", index: 9, isFolou: false, isBonus: false,},
            {type: "s", index: 4, isFolou: false, isBonus: false,},
            {type: "s", index: 4, isFolou: false, isBonus: false,},
            {type: "s", index: 6, isFolou: false, isBonus: false,},
            {type: "s", index: 6, isFolou: false, isBonus: false,},
            {type: "s", index: 7, isFolou: false, isBonus: false,},
            {type: "z", index: 7, isFolou: false, isBonus: false,},
            {type: "z", index: 7, isFolou: false, isBonus: false,},
            {type: "z", index: 7, isFolou: false, isBonus: false,},
        ]
        const hand: HandDetail = {
            paiList: paiList
        }

        const incorrect: AnswerDetail = {
            userAnswer: {type: "m", index: 5, isFolou: false, isBonus: false,},
            correctAnswer: [
                {type: "p", index: 8, isFolou: false, isBonus: false,},
                {type: "p", index: 9, isFolou: false, isBonus: false,},
            ],
        }
        // Samples //

        const button: NextButtonDetail = {
            isActive: true,
        }

        this.state = {
            hand: hand,
            answer: incorrect,
            button: button,
        };
    }

    render() {
        return (
            <>
                <Hand detail={this.state.hand}/>
                <Answer detail={this.state.answer}/>
                <NextButton detail={this.state.button}/>
            </>
        );
    }
}

export default Question;