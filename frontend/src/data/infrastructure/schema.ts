import {PaiType} from "../../component/pai/pai";
import {QuestionID} from "../../component/question/question";

type PaiDetail = {
    type: PaiType;
    index: number;
    isFolou: boolean;
    isBonus: boolean;
}

export interface IQuestionData {
    id: QuestionID,
    paiList: PaiDetail[],
    situation: string,
    page: number,
}

export interface IAnswerRequest {
    userAnswer: PaiDetail,
}

export interface IAnswerData {
    isCorrect: boolean,
    correctAnswer: PaiDetail[],
}
