import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_API_ENDPOINT,
    headers: {
        "Content-type": "application/json"
    }
});