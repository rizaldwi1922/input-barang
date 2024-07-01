import http from "../http";

const getItemByBarcode = async(barcode) => {
    try {
        let response = await http.httpService(route('ItemByBarcode', {barcode: barcode}), 'GET')
        return response
    } catch (error) {
        throw error;
    }
}

export default {
    getItemByBarcode
}