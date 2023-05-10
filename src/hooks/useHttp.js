import {useCallback, useState} from "react";
import {getAuthToken} from "../util/auth";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData = null, includeBearerAuth= false) => {
        setIsLoading(true);
        setError(null);
        try {
            requestConfig.headers = requestConfig.headers ? {...requestConfig.headers, "Content-Type": "application/json"} : {"Content-Type": "application/json"};
            if (includeBearerAuth) {
                requestConfig.headers = { ...requestConfig.headers, Authorization: "Bearer " + getAuthToken() };
            }

            const response = await fetch(process.env.REACT_APP_BASE_API_URL + requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });

            if (!response.ok) {
                throw new Error("Request failed!");
            }

            const data = await response.json();
            if(data.error){
                setError(data.message);
            }
            if(applyData !== null)
                applyData(data);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};
export default useHttp;