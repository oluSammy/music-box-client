import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
import { checkIsLoggedIn } from '../../utils/checkIsLoggedIn';

const PrivateRoute = ({ ...rest }) => {
    // const { user } = useContext(AuthContext);
    // const location = useLocation<any>();
    // const { from } = location.state;
    // console.log(from, "************" );
    // localStorage.

    return (
        <>
            {!checkIsLoggedIn() ? <Redirect to= "/"  /> :
            <Route { ...rest } />
            }
        </>
    )
}

export default PrivateRoute
