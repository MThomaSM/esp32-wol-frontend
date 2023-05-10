import { Nav, NavDropdown } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { devicesLoader} from "../util/loaders";
import { useEffect, useState} from "react";
const AuthNavigation = ({authData}) => {

    const isLoggedIn = authData.token.length > 0;
    const [ devices, setDevices ] = useState(null);

    useEffect(() => {
        devicesLoader().then(devices => setDevices(devices));
    }, [isLoggedIn])

    return (
      <>
          <Nav.Link as={NavLink} to="/">Domov</Nav.Link>
          {isLoggedIn && (
              <>
                  <Nav.Link as={NavLink} to="/devices/edit/new">Pridať nové zariadenie</Nav.Link>
                  <Nav.Link as={NavLink} to="/computers/edit/new">Pridať nový počítač</Nav.Link>
                  {devices && (
                      <NavDropdown title="Startlisty" id="basic-nav-dropdown">
                          {
                              devices.map((device, index) => (
                                  <NavDropdown.Item key={index} as={NavLink} to={"/startlist/"+device.uuid}>{device.name}</NavDropdown.Item>
                              ))
                          }
                      </NavDropdown>
                  )}
              </>
          )}
      </>
  )
}
export default AuthNavigation;