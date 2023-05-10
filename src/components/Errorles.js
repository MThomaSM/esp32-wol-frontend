
const Errorles = ({error, children}) => {
    if(error)
        return <h1>{error}</h1>;
    else return children;
}

export default Errorles;