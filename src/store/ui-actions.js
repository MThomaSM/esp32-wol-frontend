import {uiActions} from "./ui-slice";

export const showNotification = (notificationSettings, timeout = 3000) => async (dispatch) => {
    dispatch(uiActions.pushNotification(notificationSettings));
    if(timeout !== -1){
        setTimeout(() => {
            dispatch(uiActions.removeLastNotification());
        }, timeout)
    }
}