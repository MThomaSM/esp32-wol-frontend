import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { notifications: [] },
    reducers: {
        pushNotification(state, action){
            switch (action.payload.status){
                case "error": action.payload.status = "danger"; break;
                case "ok": action.payload.status = "success"; break;
                case "message": action.payload.status = "primary"; break;
                default: break;
            }
            state.notifications.push({ status: action.payload.status, title: action.payload.title, message: action.payload.message})
        },
        clearNotification(state, action){
            state.notifications = [];
        },
        removeLastNotification(state, action){
            state.notifications.shift();
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;