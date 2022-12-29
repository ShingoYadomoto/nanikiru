import {PaiType} from "../../component/pai/pai";

type PaiDetail = {
    type: PaiType;
    index: number;
    isFolou: boolean;
    isBonus: boolean;
}

export interface IQuestionData {
    paiList: PaiDetail[],
    situation: string,
}

export interface IAnswerRequest {
    userAnswer: PaiDetail,
}

export interface IAnswerData {
    isCorrect: boolean,
    correctAnswer: PaiDetail[],
}
