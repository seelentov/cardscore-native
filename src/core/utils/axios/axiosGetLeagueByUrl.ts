import { API_URL } from "../../store/api/api";
import { encodeUrl } from "../url/encodeUrl";
import axiosBaseFetch from "./axiosBaseFetch"

const axiosGetLeagueByUrl = async (url: string) => {
    const data = await axiosBaseFetch(API_URL + `/parser/games/${encodeUrl(url)}`)
    return data;
}

export default axiosGetLeagueByUrl;