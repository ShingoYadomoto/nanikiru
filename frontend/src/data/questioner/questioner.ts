import data from "../infrastructure/data";
import {IAnswerRequest} from "../infrastructure/schema";
import {PaiDetail, PaiType} from "../../component/pai/pai";
import {HandDetail} from "../../component/hand/hand";
import {AnswerDetail} from "../../component/answer/answer";
import {QuestionID} from "../../component/question/question";

const getNextQuestion = (excludeID: QuestionID[]) => {
    // ToDo: mapping data to component schema
    const questionDTO = data.getQuestion(excludeID)

    const paiList: PaiDetail[] = [
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
    const hand: HandDetail = {
        paiList: paiList
    }

    return hand;
};

const answer = (id: QuestionID, userAnswer: PaiDetail) => {
    const body: IAnswerRequest = {
        userAnswer: userAnswer,
    }

    // ToDo: mapping data to component schema
    const resultDTO = data.postAnswer(id, body)

    const incorrectResult: AnswerDetail = {
        isCorrect: false,
        userAnswer: userAnswer,
        correctAnswer: [
            {type: PaiType.Pinzu, index: 8, isFolou: false, isBonus: false,},
            {type: PaiType.Pinzu, index: 9, isFolou: false, isBonus: false,},
        ],
    }


    return incorrectResult;
};

const Questioner = {
    getNextQuestion,
    answer,
};

export default Questioner;