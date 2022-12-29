import React from 'react'
import {Hand, HandDetail} from '../hand/hand'
import {Answer, AnswerDetail} from '../answer/answer'
import {NextButton, NextButtonDetail} from "../nextButton/nextButton";
import Questioner from "../../data/questioner/questioner";
import {PaiDetail} from "../pai/pai";

export type QuestionID = number

type QuestionState = {
    questionID: QuestionID;
    hand: HandDetail;
    answer?: AnswerDetail;
    button: NextButtonDetail;
}

class Question extends React.Component<{}, QuestionState> {
    constructor(props: {}) {
        super(props);

        const excludeID: QuestionID[] = []
        const question: [HandDetail, QuestionID] = Questioner.getNextQuestion(excludeID)
        const button: NextButtonDetail = {
            isActive: false,
        }

        this.state = {
            questionID: question[1],
            hand: question[0],
            button: button,
        };
    }

    handleAnswer(id: QuestionID, selected: PaiDetail) {
        const answer = Questioner.answer(id, selected);

        this.setState({ answer: answer });
    }

    render() {
        const answer = this.state.answer == undefined ? <></> : <Answer detail={this.state.answer}/>

        return (
            <>
                <Hand detail={this.state.hand} onPaiSelected={selected => this.handleAnswer(this.state.questionID, selected)}/>
                {answer}
                <NextButton detail={this.state.button}/>
            </>
        );
    }
}

export default Question;