import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>Oops! You seem to be lost.</h1>
            <br />
            <p>
                Back to <Link to='/'>Home</Link>
            </p>
        </>
    );
};

export default NotFound;
