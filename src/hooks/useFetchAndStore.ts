import { useEffect, useState } from "react";
import { useBeerStore } from "../store/store";

const useFetchAndStore = (url: string): {loading: boolean, error: boolean} => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // ф-ія для запису в стор
    // const storeAction = useBeerStore((state: any) => state.storeAction);

    useEffect(() => {
        // setLoading(true)
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data')
            }
            return res.json()
        })
        .then(data => {
            // setBeerList(data);
            setError(false)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setLoading(false)
        })
    }, [url])

    return {loading, error }
}

export default useFetchAndStore