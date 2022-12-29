import data from "../infrastructure/data";
import {IAnswerRequest, IQuestionData} from "../infrastructure/schema";
import {PaiDetail, PaiType} from "../../component/pai/pai";
import {HandDetail} from "../../component/hand/hand";
import {AnswerDetail} from "../../component/answer/answer";
import {QuestionID} from "../../component/question/question";

const getNextQuestion = (excludeID: QuestionID[]): [HandDetail, QuestionID] => {
    // ToDo: mapping data to component schema

    let id: QuestionID
    let paiList: PaiDetail[]
    data.getQuestion(excludeID)
        .then((response) => {
            id = response.data.id;
            paiList = response.data.paiList;
        })
        .catch((e: Error) => {
            console.log(e);
        });

    paiList = [
        {type: PaiType.Manzu, index: 5, isFolou: false, isBonus: false,},
        {type: PaiType.Manzu, index: 6, isFolou: false, isBonus: false,},
        {type: PaiType.Pinzu, index: 5, isFolou: false, isBonus: false,},
        {type: PaiType.Pinzu, index: 6, isFolou: false, isBonus: false,},
        {type: PaiType.Pinzu, index: 8, isFolou: false, isBonus: false,},
        {type: PaiType.Pinzu, index: 9, isFolou: false, isBonus: false,},
        {type: PaiType.Sozu, index: 4, isFolou: false, isBonus: false,},
        {type: PaiType.Sozu, index: 4, isFolou: false, isBonus: false,},
        {type: PaiType.Sozu, index: 6, isFolou: false, isBonus: false,},
        {type: PaiType.Sozu, index: 6, isFolou: false, isBonus: false,},
        {type: PaiType.Sozu, index: 7, isFolou: false, isBonus: false,},
        {type: PaiType.Zi, index: 7, isFolou: false, isBonus: false,},
        {type: PaiType.Zi, index: 7, isFolou: false, isBonus: false,},
        {type: PaiType.Zi, index: 7, isFolou: false, isBonus: false,},
    ]
    id = 1

    const hand: HandDetail = {
        paiList: paiList
    }

    return [hand, id];
};

const answer = (id: QuestionID, userAnswer: PaiDetail) => {
    const body: IAnswerRequest = {
        userAnswer: userAnswer,
    }

    let isCorrect: boolean
    let correctAnswer: PaiDetail[]
    // ToDo: mapping data to component schema
    const resultDTO = data.postAnswer(id, body)
        .then((response) => {
            isCorrect = response.data.isCorrect;
            correctAnswer = response.data.correctAnswer;
        })
        .catch((e: Error) => {
            console.log(e);
        });


    isCorrect = false
    correctAnswer = [
        {type: PaiType.Pinzu, index: 8, isFolou: false, isBonus: false,},
        {type: PaiType.Pinzu, index: 9, isFolou: false, isBonus: false,},
    ]

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