import {getAuthToken} from "./auth";
import {sendBasicRequest} from "./fetch";

export const getResources = async (resource) => {
    const token = getAuthToken();
    if(!token)
        return [];
    const response = await sendBasicRequest(process.env.REACT_APP_BASE_API_URL+"resources/"+resource, "GET", null, {
        'Authorization': 'Bearer '+token
    })
    return response.data;
}