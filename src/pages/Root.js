import {userActions} from "../store/user-slice";
import {useDispatch} from "react-redux";
import {Outlet, useLoaderData} from "react-router-dom";
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";
import Navigation from "../components/Navigation";
import Content from "../components/Content";
import Footer from "../components/Footer";

function RootLayout() {
    const authData = useLoaderData();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!authData.token)
            return;

        const tokenDuration = getTokenDuration();
        setTimeout(() => {
            dispatch(userActions.logoutUser());
        }, tokenDuration);
    }, [authData.token]);

    return (
        <>
            <Navigation/>
            <Content><Outlet/></Content>
            <Footer/>
        </>
    )

}

export default RootLayout;