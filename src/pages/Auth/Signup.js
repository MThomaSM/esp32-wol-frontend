import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SignupModal from "../../components/SignupModal";

const Signup = () => {

    const [showSignupModal, setShowSignupModal] = useState(true);
    const navigate = useNavigate();
    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
        navigate(-1);
    }

    return <SignupModal handleCloseModal={handleCloseSignupModal} showModal={showSignupModal} />;
}

export default Signup;