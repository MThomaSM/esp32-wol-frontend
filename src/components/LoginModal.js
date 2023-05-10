import React from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {loginUser} from "../store/user-actions";
import Alerts from "./Alerts";
import {useNavigate} from "react-router-dom";

function LoginModal(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async(values, actions) => {
        const authData = {
            email: values.email,
            password: values.password
        }
        const logedUser = await dispatch(loginUser(authData, formik.setErrors));
        if(logedUser){
            actions.resetForm();
            props.handleCloseModal()
            navigate("/");
        }

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Neplatný email').required('Email je povinný.'),
            password: Yup.string().required('Heslo je povinné.'),
        }),
        onSubmit: onSubmitHandler,
    });

    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Prihlásenie</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Alerts/>
                    {formik.errors.submit && (
                        <Alert variant="danger">{formik.errors.submit}</Alert>
                    )}

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Zadajte email"
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.email && formik.errors.email}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Zadajte heslo"
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.password && formik.errors.password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModal}>
                        Zrušiť
                    </Button>
                    <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? 'Prihlasovanie...' : 'Prihlásiť sa'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default LoginModal;