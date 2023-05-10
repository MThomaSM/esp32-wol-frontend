import {Button, Table} from 'react-bootstrap';
import { PencilSquare, Trash, Play } from 'bootstrap-icons-react';
import {Link} from "react-router-dom";
import {showNotification} from "../../store/ui-actions";
import {useDispatch} from "react-redux";
import useHttp from "../../hooks/useHttp";

const ComputersTable = ({computers, showModal, showDeleteModal}) => {
    const {isLoading, error, sendRequest } = useHttp();
    const dispatch = useDispatch();
    const addToStartlist = async(computerId, deviceId, computerName) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        sendRequest({
            url: "resources/startlist/"+deviceId+"/add/"+computerId,
            method: "POST"
        }, null, true);

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "PC "+computerName+" bol úspešne pridaný do startlistu"
        }, 3000));
    }

    return (
        <Table bordered className="border-dark">
            <thead>
                <tr>
                    <th width="20%">ZARIADENIE</th>
                    <th width="25%">MAC ADRESA</th>
                    <th width="20%">NAZOV</th>
                    <th width="35%">AKCIA</th>
                </tr>
            </thead>
            <tbody>
            {computers.map((computer, index) => (
                <tr key={index}>
                    <td>{computer.device.name}</td>
                    <td><code>{computer.macAddress}</code></td>
                    <td>{computer.name}</td>
                    <td>
                        <Link to={"computers/edit/"+computer.id}>
                            <Button variant="primary" size="sm" className="me-2">
                                <PencilSquare className="mb-1" />
                            </Button>
                        </Link>
                        <Link to={"computers/delete/"+computer.id}>
                            <Button variant="danger" size="sm" className="me-2">
                                <Trash className="mb-1" />
                            </Button>
                        </Link>
                        <Button variant="success" size="sm" className="me-2" onClick={addToStartlist.bind(this, computer.id, computer.device.id, computer.name)}>
                            <Play className="mb-1"/>
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default ComputersTable;