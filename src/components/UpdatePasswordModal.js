import React from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import Alerts from "./Alerts";
import {useNavigate} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import {userActions} from "../store/user-slice";
import {showNotification} from "../store/ui-actions";
import Authenticated from "./Authenticated";

function UpdatePasswordModal(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, error, sendRequest } = useHttp();
    const onSubmitHandler = async(values, actions) => {
        const authData = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        }

        sendRequest({
            url: "users/updatePassword",
            method: "POST",
            body: authData
        }, (data) => {
            if(data.error){
                dispatch(showNotification({
                    status: 'error',
                    title: 'error',
                    message: data.message
                }, 5000));
            } else {
                dispatch(showNotification({
                    status: 'success',
                    title: 'success',
                    message: "Heslo bolo úspešne zmenené"
                }, 5000));
                dispatch(userActions.updateUser({
                    token: data.token, expires: data.expiresIn, user: data.data.user
                }));
                actions.resetForm();
                props.handleCloseModal()
                navigate("/");
            }
        }, true);
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required('Stare heslo je povinné.'),
            newPassword: Yup.string()
                .required('Heslo je povinné.')
                .min(5, 'Heslo musí obsahovať aspoň 5 znakov.')
                .matches(/[0-9]/, 'Heslo musí obsahovať aspoň jedno číslo.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Heslá sa nezhodujú.')
                .required('Potvrdiť heslo je povinné.')
        }),
        onSubmit: onSubmitHandler,
    });

    return (
        <Authenticated>
            <Modal show={props.showModal} onHide={props.handleCloseModal} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Aktuálizácia hesla</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Alerts/>
                        {formik.errors.submit && (
                            <Alert variant="danger">{formik.errors.submit}</Alert>
                        )}

                        <Form.Group controlId="formOldPassword">
                            <Form.Label>Staré heslo</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                placeholder="Zadajte stare heslo"
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
                                onChange={formik.handleChange}
                                value={formik.values.oldPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.oldPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Nové heslo</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Zadajte heslo"
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.newPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Kontrolné nové heslo</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Zadajte heslo"
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleCloseModal}>
                            Zrušiť
                        </Button>
                        <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                            {formik.isSubmitting ? 'Aktualizujem...' : 'Aktualizovať'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Authenticated>
    );
}

export default UpdatePasswordModal;