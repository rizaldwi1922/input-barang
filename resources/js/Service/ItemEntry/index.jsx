import http from "../http";

const getItemByBarcode = async(barcode) => {
    try {
        let response = await http.httpService(route('ItemByBarcode', {barcode: barcode}), 'GET')
        return response
    } catch (error) {
        throw error;
    }
}

const insertData = async(data) => {
    try {
        let response = await http.httpService(route('EntryItemStore'), 'POST', data)
        return response
    } catch (error) {
        throw error;
    }
}

export default {
    getItemByBarcode,
    insertData
}