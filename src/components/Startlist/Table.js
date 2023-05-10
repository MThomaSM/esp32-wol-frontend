import {Badge, Button, Table} from "react-bootstrap";
import {PencilSquare, Trash} from "bootstrap-icons-react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {showNotification} from "../../store/ui-actions";
import {useDispatch} from "react-redux";
import {secondsDifference} from "../../util/secondsDifference";
import {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";

const StartlistTable = ({startlist}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {deviceUuid} = useParams();
    const [device, setDevice] = useState(null);
    const {isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        sendRequest({
            url: "resources/devices/"+deviceUuid,
            method: "GET"
        }, (data) => { setDevice(data[0]) }, true);
    }, [deviceUuid, sendRequest])

    const onDelete = async(startlistId) => {
        sendRequest({
            url: "resources/startlist/"+startlistId,
            method: "DELETE"
        }, null, true);
        navigate("");
        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "úspešne zmazané"
        }, 3000));
    }

    const badgeBg = secondsDifference(new Date(device?.lastActiveTime), new Date()) <= 60 ? "success" : "danger";

    return (
        <>
            <hr/>
            <h3 className="fw-light">
                Startlist zariadenia <Badge bg={badgeBg}>{device?.name}</Badge> {" "}
                <Link to={"/devices/edit/"+deviceUuid}>
                    <PencilSquare/>
                </Link>
                <Link to={"/devices/delete/"+deviceUuid}>
                    <Trash/>
                </Link>
            </h3>
            <Table bordered className="border-dark">
                <thead>
                <tr>
                    <th width="5%">#</th>
                    <th width="10%">STAV</th>
                    <th width="35%">POČÍTAČ</th>
                    <th width="30%">MAC ADRESA</th>
                    <th width="20%">PLÁNOVANÝ ČAS ZAPNUTIA</th>
                    <th width="10%">AKCIA</th>
                </tr>
                </thead>
                <tbody>

                {startlist.map((item, index) => (

                    <tr key={index}>
                        <td>{++index}</td>
                        <td>
                            {
                                item.executedTime === null ? (<Badge bg="warning" text="dark">
                                    Plánovaný
                                </Badge>) : (<Badge bg="success" text="dark">
                                    Vykonaný
                                </Badge>)
                            }

                        </td>
                        <td>{item.computer.name}</td>
                        <td>
                            <code>{item.computer.macAddress}</code>
                        </td>
                        <td>{new Date(item.startTime).toLocaleDateString('sk-SK', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}</td>
                        <td>
                            <Button onClick={onDelete.bind(this, item.id)} variant="danger" size="sm" className="me-2">
                                <Trash className="mb-1" />
                            </Button>
                        </td>
                    </tr>
                ))}


                </tbody>
            </Table>
        </>

    )
}

export default StartlistTable;