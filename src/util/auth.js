import {redirect} from "react-router-dom";


export const getUserData = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}
export const getTokenDuration = () => { //v ms (s*1000)
    const storedExpirationDate = localStorage.getItem('expires');
    const expirationDate = new Date(parseInt(storedExpirationDate)*1000);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime(); //ked je token v budnocsti tak to bude stale kladna hodnota a ked nie tak negativna
    return duration;
}

export const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if(!token)
        return null;

    const tokenDuration = getTokenDuration();
    if(tokenDuration <= 0){
        return null;
    }
    return token;
}

export const tokenLoader = () => {
    return {token: getAuthToken(), user: getUserData()};
}

export const checkAuthLoader = () => {
    const token = getAuthToken();

    if(!token){
        return redirect('/test');
    }
    return null;
}