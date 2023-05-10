import Authenticated from "../../components/Authenticated";
import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/ui-actions";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp";


const EditDevice = () => {

    const defaultValues = {
        // eslint-disable-next-line no-mixed-operators
        uuid: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => ((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15 >> (c / 4)).toString(16)),
        name: ""
    }
    
    const dispatch = useDispatch();
    const { deviceId } = useParams();
    const navigate = useNavigate();

    const {isLoading, error, sendRequest } = useHttp();

    const method = deviceId === "new" ? "POST" : "PATCH";

    const onSubmitHandler = async(values, actions) => {
        const deviceData = {
            name: values.name,
            uuid: method === "POST" ? defaultValues.uuid : undefined
        }

        const url = method === "POST" ? "resources/devices" : "resources/devices/"+values.uuid;
        sendRequest({
            url,
            body: deviceData,
            method
        }, null, true)

        dispatch(showNotification({
            status: 'success',
            title: 'success',
            message: "Device "+deviceData.name+" bol úspešne upravený"
        }, 3000));
        navigate(-1);
    }

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Toto pole je povinné"),
        }),
        onSubmit: onSubmitHandler,
    });

    useEffect(() => {
        const transformData = data => {
            formik.setValues({
                uuid: data[0].uuid,
                name: data[0].name
            });
        }

        if(method === "PATCH"){
            sendRequest({
                url: "resources/devices/" + deviceId,
            }, transformData, true);
        } else {
            transformData([defaultValues])
        }

    }, [deviceId, formik.setValues, method, sendRequest]);

  return (
      <Authenticated>
          <Row className="justify-content-between">
              <Col className="text-start col-8">
                  <h1>{method === "POST" ? "Vytvoriť" : "Upraviť" } zariadenie</h1>
                  <Form noValidate onSubmit={formik.handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicUuid">
                          <Form.Label>UUID Vášho ESP32</Form.Label>
                          <Form.Control type="text" placeholder="UUID Vášho ESP32" value={formik.values.uuid} disabled/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Meno vášho ESP32</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Meno vášho ESP32"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.name && formik.errors.name}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicButtons">
                          <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid} style={{float: "right"}}>
                              {formik.isSubmitting ? (method === "POST" ? 'Vytváram...' : "Upravujem...") : (method === "POST" ? 'Vytvoriť' : "Upraviť")}
                          </Button>
                      </Form.Group>
                  </Form>
              </Col>
              <Col className="text-start col-4">
                  <h1>Konfugurácia</h1>
                  Po vytvorení si skopírujte UUID a stiahnite program ktorý potom
                  nakofigurujte následovne.<br/>
                  <b> UUID - </b> Sem vložte skopirované UUID <br/>
                  <b> Meno k Wifi - </b> Sem vyplnte meno wifi siete v ktorej sú Vaše počítače <br/>
                  <b> Heslo k Wifi - </b> Sem vypnte heslo k danej wifi sieti. <br/>
                  Po stlačení uložiť sa do minutý všetky údaje uložia na Vaše zariadenie a môžete ho začať použivať.
              </Col>
          </Row>

      </Authenticated>
  )
}

export default EditDevice;