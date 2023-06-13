import axios from "axios";

export const API_SERVER = "https://api.mandarin.weniv.co.kr/";

const customAxios = axios.create({
    baseURL: API_SERVER, // 기본 서버 주소 입력
});

export default customAxios;
