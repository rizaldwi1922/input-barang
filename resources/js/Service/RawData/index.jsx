import http from "../http";

const fetchRaw = async(endpoint) => {
    try {
        let response = await http.httpService(route(endpoint), 'GET')
        return response
    } catch (error) {
        throw error;
    }
}

export default {
    fetchRaw
}