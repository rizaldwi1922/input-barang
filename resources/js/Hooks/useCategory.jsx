import { useState, useEffect } from "react";
import api from "@/Service/api";

const useCategory = () => {
    const app = api
    const [category, setCategory] = useState()

    const get = async() => {
        const res = await app.RawData.fetchRaw('CategoryGetAllRawData')
        setCategory(res)
    }

    useEffect(() => {
        get()
    },[])

    return {
        get,
        category
    }
}

export default useCategory;