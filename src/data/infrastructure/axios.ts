import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8888/",
    // baseURL: "https://nanikiru-functions.netlify.app/.netlify/functions/",
    headers: {
        "Content-type": "application/json"
    }
});