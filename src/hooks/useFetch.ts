import { useEffect, useState } from "react";

const useFetch = (url: string): {data: any | null, loading: boolean, error: boolean} => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data')
            }
            return res.json()
        })
        .then(data => {
            setLoading(false)
            setError(false)
            setData(data)
        })
        .catch(err => {
            setLoading(false)
            setError(err.message)
        })
    }, [url])

    return {data, loading, error }
}

export default useFetch