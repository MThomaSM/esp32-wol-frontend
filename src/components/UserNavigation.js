import {Dropdown, Nav, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logoutWithMessage} from "../store/user-actions";
import {useNavigate} from "react-router-dom";

const UserNavigation = (props) => {

    const dispatch = useDispatch();
    const isLoggedIn = props.authData.token.length > 0;
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutWithMessage("Boli ste úspešne odhlasený"));
    }

      return (
          <>
              {!isLoggedIn && (
                  <>
                      <Nav.Link onClick={() => navigate("/auth/login")}>Prihlásenie</Nav.Link>
                      <Nav.Link onClick={() => navigate("/auth/signup")}>Registrácia</Nav.Link>
                  </>
              )}

              {isLoggedIn && (
                  <>
                      <Dropdown>
                          <Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic">
                              {props.authData.user.email}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                              <Dropdown.Item onClick={() => navigate("/auth/updatePassword")}>Zmeniť heslo</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={handleLogout}>Odhlásiť sa</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </>
              )}

          </>
      );
}

export default UserNavigation;