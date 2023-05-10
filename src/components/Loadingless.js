import Loader from "./Loader";

const Loadingless = ({isLoading, children}) => {
    if(isLoading)
        return <Loader/>;
    else return children;
}

export default Loadingless;