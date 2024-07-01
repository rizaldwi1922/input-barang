import { useState, useEffect } from "react";
import api from "@/Service/api";

const useUomSmall = () => {
    const app = api
    const [uomSmall, setUomSmall] = useState([])

    const get = async() => {
        const res = await app.RawData.fetchRaw('UomSmallGetAllRawData')
        setUomSmall(res)
    }

    useEffect(() => {
        get()
    },[])

    return {
        get,
        uomSmall
    }
}

export default useUomSmall;