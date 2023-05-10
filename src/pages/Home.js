import {Await, defer, Link, useLoaderData} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import {Pen} from 'bootstrap-icons-react';
import {Suspense} from "react";
import ComputersTable from "../components/Computers/Table";
import Authenticated from "../components/Authenticated";
import Loader from "../components/Loader";
import DevicesTable from "../components/Devices/Table";
import {computersLoader, devicesLoader} from "../util/loaders";

const Home = () => {
    const { devices, computers } = useLoaderData();


  return (
      <Authenticated>
        <Row>
          <Col xl={6} sm={12}>
              <b>Vaše zariadenia</b>
              <Suspense fallback={(<Loader/>)}>
                  <Await resolve={devices}>
                      {devices => <DevicesTable devices={devices}/> }
                  </Await>
              </Suspense>
              <Link to="devices/edit/new"><Button variant="success" size="sm"><Pen className="mb-1" /> Pridať nové ESP32 zariadenie</Button></Link>
          </Col>
            <Col xl={6} sm={12}>
                <b>Vaše počítače</b>
                <Suspense fallback={(<Loader/>)}>
                    <Await resolve={computers}>
                        {computers => <ComputersTable computers={computers}/> }
                    </Await>
                </Suspense>
                <Link to="computers/edit/new"><Button variant="success" size="sm"><Pen className="mb-1" /> Pridať nový počítač</Button></Link>
            </Col>
        </Row>
      </Authenticated>
  )
}

export const homeLoader = async() => {
  return defer({
    devices: devicesLoader(),
    computers: computersLoader()
  })
}

export default Home;