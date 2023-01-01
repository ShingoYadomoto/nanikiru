import React from 'react'
import {Hand, HandDetail} from '../hand/hand'
import {Answer, AnswerDetail} from '../answer/answer'
import {NextButton} from "../nextButton/nextButton";
import {AcceptLink} from "../acceptLink/acceptLink";
import {PaiDetail} from "../pai/pai";
import data from "../../data/infrastructure/data";
import {IAnswerRequest} from "../../data/infrastructure/data";
import './question.css'

export type QuestionID = number

type QuestionState = {
    excludeID: QuestionID[]
    questionID: QuestionID;
    hand: HandDetail;
    answer?: AnswerDetail;
}

class Question extends React.Component<{}, QuestionState> {
    constructor(props: {}) {
        super(props);

        const hand: HandDetail = {
            paiList: [],
        }

        this.state = {
            excludeID: [],
            questionID: 0,
            hand: hand,
        };
    }

    componentDidMount() {
        this.nextQuestion()
    }

    nextQuestion() {
        data.getQuestion(this.state.excludeID)
            .then((response) => {
                const excludeID = this.state.excludeID
                excludeID.push(response.data.id)

                this.setState({
                    excludeID: excludeID,
                    questionID: response.data.id,
                    answer: undefined,
                    hand: {
                        paiList: response.data.paiList
                    },
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    handleAnswer(id: QuestionID, selected: PaiDetail) {
        const body: IAnswerRequest = {
            userAnswer: selected,
        }

        data.getAnswer(id, body)
            .then((response) => {
                this.setState({
                    answer: {
                        page: response.data.page,
                        isCorrect: response.data.isCorrect,
                        userAnswer: selected,
                        correctAnswer: response.data.correctAnswer,
                    },
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const answer      = this.state.answer === undefined ? <></> : <Answer detail={this.state.answer}/>
        const nextButton  = this.state.answer === undefined ? <></> : <NextButton onClickNextButton={() => this.nextQuestion()}/>
        const acceptButton = this.state.answer === undefined ? <></> : <AcceptLink paiList={this.state.hand.paiList}/>

        return (
            <>
                <div className="hand-container">
                    <Hand detail={this.state.hand} onPaiSelected={selected => this.handleAnswer(this.state.questionID, selected)}/>
                </div>
                <div className="answer-container">
                    {answer}
                </div>
                <div className="button-container">
                    {nextButton}
                    {acceptButton}
                </div>
            </>
        );
    }
}

export default Question;