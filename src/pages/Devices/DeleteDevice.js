import Authenticated from "../../components/Authenticated";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/ui-actions";
import {Link, useNavigate, useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Errorles from "../../components/Errorles";
import Loadingless from "../../components/Loadingless";

const DeleteDevice = () => {

    const [device, setDevice] = useState(null);
    const dispatch = useDispatch();
    const { deviceId } = useParams();
    const navigate = useNavigate();


    const {isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        const transformData = data => setDevice(data[0]);
        sendRequest({
            url: "resources/devices/" + deviceId,
        }, transformData, true);
    }, [deviceId, sendRequest])
    
    const onDelete = async() => {
        sendRequest({
            url: "resources/devices/"+device.uuid,
            method: "DELETE"
        }, null, true);

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Device "+device.name+" bol úspešne zmazaný"
        }, 3000));
        navigate(-1);
    }

        return (
            <Authenticated>
                <Errorles error={error}>
                    <Loadingless isLoading={isLoading}>
                        <h3>Prajete si zmazať zariadenie {device?.name}?</h3>
                        <Link to="/"><Button variant="secondary">Zrušiť</Button></Link>{" "}
                        <Button variant="danger" onClick={onDelete}>Odstrániť</Button>
                    </Loadingless>
                </Errorles>
            </Authenticated>
        )

}

export default DeleteDevice;