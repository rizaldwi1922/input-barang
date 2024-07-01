import { data } from "autoprefixer";
import http from "../http";

const fetchDataTable = async(endpoint, params) => {
    try {
        let response = await http.httpService(route(endpoint), 'POST', params)
        return response
    } catch (error) {
        throw error;
    }
}

export default {
    fetchDataTable
}