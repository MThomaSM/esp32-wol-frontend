import { Button, Form, Table } from "react-bootstrap";
import { PencilSquare, Trash } from "bootstrap-icons-react";
import {Link, useNavigate} from "react-router-dom";
import {showNotification} from "../../store/ui-actions";
import {useDispatch} from "react-redux";
import useHttp from "../../hooks/useHttp";

const ComputersTable = ({ computers }) => {
    const navigate = useNavigate();
    const deviceId = computers[0]?.device.id;
    const dispatch = useDispatch();

    const {isLoading, error, sendRequest } = useHttp();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const bulkData = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            if(checkbox.name && checkbox.checked){
                const time = document.querySelector('input[type="datetime-local"][name="'+checkbox.name+'"]').value;
                bulkData.push({
                    computer: checkbox.name,
                    time
                })
            }
        });

        checkAll(false);
        sendRequest({
            url: "resources/startlist/bulk/"+deviceId,
            method: "POST",
            body: bulkData
        }, null, true);

        navigate("");
        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Počítače boli úspešne naplanované na zapnutie"
        }, 3000));
    };

    const checkAll = (checkState) => {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.checked = checkState;
        });
    }

    const handleAllCheck = (e) => checkAll(e.target.checked);

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Table bordered className="border-dark">
                    <thead>
                    <tr>
                        <th width="5%">
                            <Form.Check type="checkbox" id="allcheck" onClick={handleAllCheck} />
                        </th>
                        <th width="35%">POČÍTAČ</th>
                        <th width="30%">MAC ADRESA</th>
                        <th width="20%">PLÁNOVANÝ ČAS ZAPNUTIA</th>
                        <th width="10%">AKCIA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {computers.map((computer, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    name={computer.id}
                                />
                            </td>
                            <td>{computer.name}</td>
                            <td>
                                <code>{computer.macAddress}</code>
                            </td>
                            <td>
                                <Form.Control
                                    type="datetime-local"
                                    name={computer.id}
                                    defaultValue={
                                        new Date().toISOString().slice(0, 16)
                                    }
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="form-control-sm"
                                />
                            </td>
                            <td>
                                <Link to={"/computers/edit/" + computer.id}>
                                    <Button variant="primary" size="sm" className="me-2">
                                        <PencilSquare className="mb-1" />
                                    </Button>
                                </Link>
                                <Link to={"/computers/delete/" + computer.id}>
                                    <Button variant="danger" size="sm" className="me-2">
                                        <Trash className="mb-1" />
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Button variant="primary" type="submit">
                    Odoslať
                </Button>
            </Form>
        </>
    );
};

export default ComputersTable;
