import {useSelector} from "react-redux";
import {Alert, Container} from "react-bootstrap";
import React, {useState} from "react";
import CustomAlert from "./CustomAlert";

const Alerts = () => {
    const notifications = useSelector(state => state.ui.notifications);
    return notifications.map((notification, index) => (
        <CustomAlert variant={notification.status} message={notification.message} key={index}/>
    ));
}

export default Alerts;