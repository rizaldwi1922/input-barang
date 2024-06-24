import { httpInstance } from "./instance";

const httpService = async(endpoint, method, data = null) => {
    let response = await httpInstance(endpoint, method, data)
    return response.data
}

export default {
    httpService
}   