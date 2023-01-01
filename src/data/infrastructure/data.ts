import axios from "./axios";
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

const getQuestion = (excludeID: QuestionID[]) => {
    return axios.get<IQuestionData>(`/question`, { params: { exclude_id: JSON.stringify(excludeID) } });
};

const getAnswer = (id: QuestionID, data: IAnswerRequest) => {
    return axios.get<IAnswerData>(`/answer`, { params: { question_id: id, answer: JSON.stringify(data) } });
};

const Data = {
    getQuestion,
    getAnswer,
};

export default Data;