import {useState} from "react";
import LoginModal from "../../components/LoginModal";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [showLoginModal, setShowLoginModal] = useState(true);
    const navigate = useNavigate();
    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        navigate(-1);
    }

    return <LoginModal handleCloseModal={handleCloseLoginModal} showModal={showLoginModal}/>

}

export default Login;