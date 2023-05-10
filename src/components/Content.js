import {Alert, Button, Container} from 'react-bootstrap';
import {useSelector} from "react-redux";
import React from "react";
import Alerts from "./Alerts";
import {useNavigate} from "react-router-dom";

function Content(props) {

    const authData = useSelector(state => state.user);
    const isLoggedIn = authData?.token?.length > 0;
    const navigate = useNavigate();

    return (
        <main>
            <Alerts/>
            <section className="py-5 text-center">
                <Container>
                    <h1 className="fw-light">ESP32 Wake On Lan</h1>
                    <p className="lead text-muted">Zariadenie ktoré vám dovoli kdekoľvek na svete zapnúť vaš PC ktorý máte doma.</p>
                    {!isLoggedIn && (
                        <p>
                            <Button variant="primary" onClick={() => navigate("/auth/login")}>Prihlásenie</Button>{" "}
                            <Button variant="primary" onClick={() => navigate("/auth/signup")}>Registrácia</Button>
                        </p>
                    )}
                </Container>
                <Container>
                    {props.children}
                </Container>
            </section>
        </main>
    );
}

export default Content;