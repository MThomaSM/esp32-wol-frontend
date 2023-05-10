import {Badge, Button, Table} from "react-bootstrap";
import {CalendarCheck, PencilSquare, Trash} from "bootstrap-icons-react";
import {Link} from "react-router-dom";
import {secondsDifference} from "../../util/secondsDifference";

const DevicesTable = ({devices, showModal, showDeleteModal}) => {
    return (
        <Table bordered className="border-dark">
            <thead>
            <tr>
                <th width="20%">STATUS</th>
                <th width="40%">NAZOV</th>
                <th width="40%">AKCIA</th>
            </tr>
            </thead>
            <tbody>
            {devices.map((device, index) => (
                <tr key={index}>
                    <td>{ secondsDifference(new Date(device.lastActiveTime), new Date())  <= 60 ? <Badge bg="success" text="dark">Online</Badge> : <Badge bg="danger" text="dark">Offline</Badge> }</td>
                    <td>{device.name}</td>
                    <td>
                        <Link to={"devices/edit/"+device.uuid}>
                            <Button variant="primary" size="sm" className="me-2">
                                <PencilSquare className="mb-1" />
                            </Button>
                        </Link>
                        <Link to={"devices/delete/"+device.uuid}>
                            <Button variant="danger" size="sm" className="me-2">
                                <Trash className="mb-1" />
                            </Button>
                        </Link>
                        <Link to={"startlist/"+device.uuid}>
                            <Button variant="success" size="sm">
                                <CalendarCheck className="mb-1"  />
                            </Button>
                        </Link>
                    </td>
                </tr>
            ))}

            </tbody>
        </Table>
    );
}

export default DevicesTable;
