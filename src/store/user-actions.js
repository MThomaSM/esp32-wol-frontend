import {userActions} from "./user-slice";
import {showNotification} from "./ui-actions";
import {sendBasicRequest} from "../util/fetch";

export const registerUser = (data, setErrors) => {
    return async (dispatch) => {

        const response = await sendBasicRequest(process.env.REACT_APP_BASE_API_URL+'users/signup', "POST", data, {
            'Content-Type': 'application/json',
        });

        if(!response.ok){
            dispatch(showNotification({
                status: 'error',
                title: 'Error',
                message: "Niekde nastala chyba"
            }, 3000));
            setErrors({
                "email": "Niekde nastala chyba"
            })
            return false;
        }

        if(response.status !== "success" && response.errorMessage !== null){
            dispatch(showNotification({
                status: 'error',
                title: 'Error',
                message: response.errorMessage
            }, 3000));
            setErrors({
                "email": response.errorMessage
            })
            return false;
        }

        dispatch(userActions.updateUser({
            token: response.data.token, expires: response.data.expiresIn, user: response.data.data.user
        }));

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Boli ste úspešne registrovaný."
        }, 5000));
        return true;
    }
}

export const loginUser = (data, setErrors) => {
    return async (dispatch) => {
        const response = await sendBasicRequest(process.env.REACT_APP_BASE_API_URL+'users/login', "POST", data, {
            'Content-Type': 'application/json',
        });

        if(!response.ok){
            dispatch(showNotification({
                status: 'error',
                title: 'Error',
                message: "Niekde nastala chyba"
            }, 3000));
            setErrors({
                "email": "Niekde nastala chyba"
            })
            return false;
        }

        if(response.status !== "success" && response.errorMessage !== null){
            dispatch(showNotification({
                status: 'error',
                title: 'Error',
                message: response.errorMessage
            }, 3000));
            setErrors({
                "email": response.errorMessage,
                "password": response.errorMessage
            })
            return false;
        }

        dispatch(userActions.updateUser({
            token: response.data.token, expires: response.data.expiresIn, user: response.data.data.user
        }));

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Boli ste úspešne prihlasený"
        }, 5000));
        return true;
    }
}

export const logoutWithMessage = (message) => {
    return async (dispatch) => {
        dispatch(userActions.logoutUser());
        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message
        }, 5000));
    }
}