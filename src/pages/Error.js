import {useRouteError} from 'react-router-dom';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import React from "react";

function ErrorPage() {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    return (
        <>
            <>
                <Navigation/>
                    <section className="py-5 text-center">
                        <h1 className="fw-light">{title}</h1>
                        <p className="lead text-muted">{message}</p>
                    </section>
                <Footer/>
            </>
        </>
    );
}

export default ErrorPage;
