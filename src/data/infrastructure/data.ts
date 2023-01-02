import axios from "./axios";
import {PaiType} from "../../component/pai/pai";
import {QuestionID} from "../../component/question/question";
import {SituationDetail} from "../../component/situation/situation";

type PaiDetail = {
    type: PaiType;
    index: number;
    isFolou: boolean;
    isBonus: boolean;
}

export interface IQuestionData {
    id: QuestionID,
    paiList: PaiDetail[],
    situation?: SituationDetail,
    page: number,
}

export interface IAnswerRequest {
    userAnswer: PaiDetail,
}

export interface IAnswerData {
    page: number,
    isCorrect: boolean,
    correctAnswer: PaiDetail[],
    comment: string,
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