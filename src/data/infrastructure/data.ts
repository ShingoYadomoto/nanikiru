import axios from "./axios";
import {IQuestionData, IAnswerRequest, IAnswerData} from "./schema";
import {QuestionID} from "../../component/question/question";

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