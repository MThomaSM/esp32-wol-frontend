import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const Authenticated = (props) => {
    const { token } = useSelector(state => state.user);
    const [ IsAuthenticated, setIsAuthenticated ] = useState(false);
    useEffect(() => {
        if (!token)
            setIsAuthenticated(false);
        else
            setIsAuthenticated(true);
    }, [token]);


    return IsAuthenticated && props.children;
};

export default Authenticated;