import Authenticated from "../../components/Authenticated";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/ui-actions";
import {Link, useNavigate, useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Errorles from "../../components/Errorles";
import Loadingless from "../../components/Loadingless";

const DeleteComputer = () => {

    const [computer, setComputer] = useState(null);
    const dispatch = useDispatch();
    const { computerId } = useParams();
    const navigate = useNavigate();

    const {isLoading, error, sendRequest } = useHttp();


    useEffect(() => {
        const transformData = data => setComputer(data[0]);
        sendRequest({
            url: "resources/computers/"+computerId,
        }, transformData, true);
    }, [computerId, sendRequest])

    const onDelete = async() => {
        sendRequest({
            url: "resources/computers/"+computer.id,
            method: "DELETE"
        }, null, true);

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Computer "+computer.name+" bol úspešne zmazaný"
        }, 3000));
        navigate(-1);
    }

    return (
        <Authenticated>
            <Errorles error={error}>
                <Loadingless isLoading={isLoading}>
                    <h3>Prajete si zmazať počítač {computer?.name}?</h3>
                    <Link to="/"><Button variant="secondary">Zrušiť</Button></Link>{" "}
                    <Button variant="danger" onClick={onDelete}>Odstrániť</Button>
                </Loadingless>
            </Errorles>
        </Authenticated>
    )
}

export default DeleteComputer;