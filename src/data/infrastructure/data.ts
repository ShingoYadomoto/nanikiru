import axios from "./axios";
import {IQuestionData, IAnswerRequest, IAnswerData} from "./schema";
import {QuestionID} from "../../component/question/question";

const getQuestion = (excludeID: QuestionID[]) => {
    return axios.get<IQuestionData>(`/questions`);
};

const postAnswer = (id: QuestionID, data: IAnswerRequest) => {
    return axios.post<IAnswerData>(`/questions/${id}`, data);
};

const Data = {
    getQuestion,
    postAnswer,
};

export default Data;