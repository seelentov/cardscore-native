import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { API_KEY } from "../../store/api/api";

const axiosBaseFetch = async (url: string) =>{
    const token = await AsyncStorage.getItem('token') || "";
    
    const res = await axios.get(url, {
        headers:{
            "Authorization": token,
            'Content-Type': "application/json",
            "ApiKey": API_KEY
        }
    })

    return res.data
}

export default axiosBaseFetch