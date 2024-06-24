import http from "../http";

const fetchDataTable = async(endpoint) => {
    try {
        let response = await http.httpService(endpoint, 'GET')
        return response
    } catch (error) {
        throw error;
    }
}

export default {
    fetchDataTable
}