import {Alert, Container} from "react-bootstrap";
import React, {useState} from "react";

const CustomAlert = ({variant, message}) => {
    const [show, setShow] = useState(true);

    if(show)
        return (
            <Alert variant={variant} className="rounded-0 border-0" style={{ height: "60px", marginBottom: "2px" }} onClose={() => setShow(false)} dismissible>
                <Container>
                    <p>{message}</p>
                </Container>
            </Alert>
        )
}

export default CustomAlert;