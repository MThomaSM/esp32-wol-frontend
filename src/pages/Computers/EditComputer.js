import Authenticated from "../../components/Authenticated";
import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getAuthToken} from "../../util/auth";
import {showNotification} from "../../store/ui-actions";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp";

const defaultValues = {
    deviceId: "",
    name: "",
    macAddress: ""
}
const EditComputer = () => {

    const dispatch = useDispatch();
    const { computerId } = useParams();
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const method = computerId === "new" ? "POST" : "PATCH";

    const {isLoading, error, sendRequest } = useHttp();

    const onSubmitHandler = async(values, actions) => {
        const token = getAuthToken();
        const computerData = {
            deviceId: values.deviceId,
            macAddress: values.macAddress,
            name: values.name
        }
        const url = method === "POST" ? "resources/computers" : "resources/computers/"+computerId;
        sendRequest({
            url,
            method,
            body: computerData
        }, null, true);

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Device "+computerData.name+" bol úspešne upravený"
        }, 3000));
        navigate(-1);
    }

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Toto pole je povinné"),
            macAddress: Yup.string().matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "Mac adresa musí byť validná mac adresa").required("This field is required."),
            deviceId: Yup.string().required("Toto pole je povinné")
        }),
        onSubmit: onSubmitHandler,
    });

    useEffect(() => {
        const transformDevice = data => setDevices(data);
        const transformComputer = data => {
            formik.setValues({
                deviceId: data[0].device?.id,
                name: data[0].name,
                macAddress: data[0].macAddress
            });
        }

        sendRequest({
            url: "resources/devices",
        }, transformDevice, true);

        if(method === "PATCH"){
            sendRequest({
                url: "resources/computers/"+computerId,
            }, transformComputer, true);
        } else {
            transformComputer([defaultValues])
        }

    }, [computerId, formik.setValues, method, sendRequest]);

    return (
        <Authenticated>
            <Row className="justify-content-between">
                <Col className="text-start col-8">
                    <h1>{method === "POST" ? "Vytvoriť" : "Upraviť"} počítač</h1>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicDevice">
                            <Form.Label>Zariadenie</Form.Label>
                            <Form.Select
                                name="deviceId"
                                value={formik.values.deviceId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.deviceId && formik.errors.deviceId}
                            >
                                <option value="">Vyberte zariadenie</option>
                                {devices.map((device, index) => (
                                    <option key={index} value={device.id}>
                                        {device.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.deviceId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMacAddress">
                            <Form.Label>MAC Adresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MAC Adresa"
                                name="macAddress"
                                value={formik.values.macAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.macAddress && formik.errors.macAddress}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.macAddress}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Názov</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Názov"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.name && formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicButtons">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                style={{ float: "right" }}
                            >
                                {formik.isSubmitting ? "Ukladám..." : "Uložiť"}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Authenticated>
    )
}

export default EditComputer;