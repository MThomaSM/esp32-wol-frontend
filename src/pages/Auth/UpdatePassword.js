import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SignupModal from "../../components/SignupModal";
import UpdatePasswordModal from "../../components/UpdatePasswordModal";

const UpdatePassword = () => {

    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(true);
    const navigate = useNavigate();
    const handleCloseUpdatePasswordModal = () => {
        setShowUpdatePasswordModal(false);
        navigate(-1);
    }

    return <UpdatePasswordModal handleCloseModal={handleCloseUpdatePasswordModal} showModal={showUpdatePasswordModal} />;
}

export default UpdatePassword;