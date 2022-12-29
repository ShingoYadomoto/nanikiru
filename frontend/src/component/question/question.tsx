import React from 'react'
import {Hand, HandDetail} from '../hand/hand'
import {Answer, AnswerDetail} from '../answer/answer'
import {NextButton, NextButtonDetail} from "../nextButton/nextButton";
import Questioner from "../../data/questioner/questioner";

export type QuestionID = number

type QuestionState = {
    hand: HandDetail;
    answer?: AnswerDetail;
    button: NextButtonDetail;
}

class Question extends React.Component<{}, QuestionState> {
    constructor(props: {}) {
        super(props);

        const excludeID: QuestionID[] = []
        const hand = Questioner.getNextQuestion(excludeID)
        const button: NextButtonDetail = {
            isActive: false,
        }

        this.state = {
            hand: hand,
            button: button,
        };
    }

    render() {
        const answer = this.state.answer == undefined ? <></> : <Answer detail={this.state.answer}/>

        return (
            <>
                <Hand detail={this.state.hand}/>
                {answer}
                <NextButton detail={this.state.button}/>
            </>
        );
    }
}

export default Question;