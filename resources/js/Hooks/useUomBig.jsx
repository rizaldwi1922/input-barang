import { useState, useEffect } from "react";
import api from "@/Service/api";

const useUomBig = () => {
    const app = api
    const [uomBig, setUomBig] = useState([])

    const get = async() => {
        const res = await app.RawData.fetchRaw('UomBigGetAllRawData')
        setUomBig(res)
    }

    useEffect(() => {
        get()
    },[])

    return {
        get,
        uomBig
    }
}

export default useUomBig;