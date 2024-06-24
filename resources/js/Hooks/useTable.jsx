import { useEffect, useState } from "react";
import api from "@/Service/api";

const useTable = (endpoint) => {
    const comp = api;

    const [data, setData] = useState([])

    const get = async() => {
        const res = await comp.fetchDataTable.fetchDataTable(endpoint)
        console.log(endpoint)
    }

    useEffect(() => {
        get()
    },[endpoint])

    return {
        get
    }
}

export default useTable;