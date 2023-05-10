import {createSlice} from "@reduxjs/toolkit";

const defaultState = () => {
    return {
        expires: localStorage.getItem("expires") ? parseInt(localStorage.getItem("expires")) : 0,
        token: localStorage.getItem("token") ?? "",
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        updateUser(state, action){
            state.token = action.payload.token;
            state.expires = parseInt(action.payload.expires);
            state.user = action.payload.user;
            localStorage.setItem("token", state.token);
            localStorage.setItem("expires", state.expires);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logoutUser(state, action){
            state.token = "";
            state.expires = 0
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
            localStorage.removeItem("user");
        }
    },
})



export const userActions = userSlice.actions;
export default userSlice;