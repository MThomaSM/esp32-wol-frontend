import React from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../store/user-actions";

function SignupModal(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async(values, actions) => {
        const authData = {
            email: values.email,
            password: values.password,
            passwordConfirm: values.confirmPassword
        }

        const registeredUser = await dispatch(registerUser(authData, formik.setErrors));
        if(registeredUser){
            actions.resetForm();
            props.handleCloseModal()
            navigate("/");
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Neplatný email')
                .required('Email je povinný.'),
            password: Yup.string()
                .required('Heslo je povinné.')
                .min(5, 'Heslo musí obsahovať aspoň 5 znakov.')
                .matches(/[0-9]/, 'Heslo musí obsahovať aspoň jedno číslo.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Heslá sa nezhodujú.')
                .required('Potvrdiť heslo je povinné.'),
        }),
        onSubmit: onSubmitHandler,
    });

    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Registrácia</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>

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

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Potvrďte heslo</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Zadajte heslo znovu"
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                            }
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
                        {formik.isSubmitting ? 'Registrovanie...' : 'Registrovať sa'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SignupModal;
