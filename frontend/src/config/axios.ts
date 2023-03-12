import Axios from "axios";
import {backendBase} from "./constants";

const axios = Axios.create({
    baseURL: backendBase,
    withCredentials: true,
});

export default axios;
