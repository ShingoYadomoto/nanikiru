import data from "../infrastructure/data";
import {IAnswerRequest} from "../infrastructure/schema";
import {PaiDetail, PaiType} from "../../component/pai/pai";
import {HandDetail} from "../../component/hand/hand";
import {AnswerDetail} from "../../component/answer/answer";
import {QuestionID} from "../../component/question/question";

const getNextQuestion = (excludeID: QuestionID[]): [HandDetail, QuestionID] => {
    let id: QuestionID = 0
    let paiList: PaiDetail[] = []

    data.getQuestion(excludeID)
        .then((response) => {
            id = response.data.id;
            paiList = response.data.paiList;
        })
        .catch((e: Error) => {
            console.log(e);
        });


    const hand: HandDetail = {
        paiList: paiList
    }

    return [hand, id];
};

const answer = (id: QuestionID, userAnswer: PaiDetail) => {
    const body: IAnswerRequest = {
        userAnswer: userAnswer,
    }

    let isCorrect: boolean = false
    let correctAnswer: PaiDetail[] = []
    data.postAnswer(id, body)
        .then((response) => {
            isCorrect = response.data.isCorrect;
            correctAnswer = response.data.correctAnswer;
        })
        .catch((e: Error) => {
            // ToDO: remove mock data
            isCorrect = false
            correctAnswer = [
                {type: PaiType.Pinzu, index: 8, isFolou: false, isBonus: false,},
                {type: PaiType.Pinzu, index: 9, isFolou: false, isBonus: false,},
            ]

            console.log(e);
        });


    const incorrectResult: AnswerDetail = {
        isCorrect: isCorrect,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
    }


    return incorrectResult;
};

const Questioner = {
    getNextQuestion,
    answer,
};

export default Questioner;