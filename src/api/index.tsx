import axios from "axios";

const BASE_URL = "https://delivery-system-express-api.herokuapp.com/api";

export const apiV1 = axios.create({
    baseURL: BASE_URL + "/v1"
})

export const api = axios.create({
    baseURL: BASE_URL + "/v2"
});