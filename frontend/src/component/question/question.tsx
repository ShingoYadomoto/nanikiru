import React from 'react'
import {Hand, HandDetail} from '../hand/hand'
import {Answer, AnswerDetail} from '../answer/answer'
import {NextButton, NextButtonDetail} from "../nextButton/nextButton";
import {PaiDetail, PaiType} from "../pai/pai";
import data from "../../data/infrastructure/data";
import {IAnswerRequest} from "../../data/infrastructure/schema";

export type QuestionID = number

type QuestionState = {
    excludeID: QuestionID[]
    questionID: QuestionID;
    hand: HandDetail;
    answer?: AnswerDetail;
    button: NextButtonDetail;
}

class Question extends React.Component<{}, QuestionState> {
    constructor(props: {}) {
        super(props);

        const button: NextButtonDetail = {
            isActive: false,
        }

        const hand: HandDetail = {
            paiList: [],
        }

        this.state = {
            excludeID: [],
            questionID: 0,
            hand: hand,
            button: button,
        };
    }

    componentWillMount() {
        this.nextQuestion()
    }

    nextQuestion() {
        data.getQuestion(this.state.excludeID)
            .then((response) => {
                const hand: HandDetail = {
                    paiList: response.data.paiList
                }

                const excludeID = this.state.excludeID
                excludeID.push(response.data.id)

                this.setState({
                    excludeID: excludeID,
                    questionID: response.data.id,
                    answer: undefined,
                    hand: hand,
                    button: {isActive: false},
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

        data.postAnswer(id, body)
            .then((response) => {
                const answer: AnswerDetail = {
                    isCorrect: response.data.isCorrect,
                    userAnswer: selected,
                    correctAnswer: response.data.correctAnswer,
                }

                this.setState({
                    answer: answer,
                    button: {isActive: true},
                });
            })
            .catch((e: Error) => {
                // ToDO: remove mock data

                this.setState({
                    answer: {
                        isCorrect: false,
                        userAnswer: selected,
                        correctAnswer: [
                            {type: PaiType.Pinzu, index: 8, isFolou: false, isBonus: false,},
                            {type: PaiType.Pinzu, index: 9, isFolou: false, isBonus: false,},
                        ],
                    },
                    button: {isActive: true},
                });

                console.log(e);
            });
    }

    render() {
        const answer = this.state.answer == undefined ? <></> : <Answer detail={this.state.answer}/>

        return (
            <>
                <Hand detail={this.state.hand} onPaiSelected={selected => this.handleAnswer(this.state.questionID, selected)}/>
                {answer}
                <NextButton detail={this.state.button} onClickNextButton={() => this.nextQuestion()}/>
            </>
        );
    }
}

export default Question;