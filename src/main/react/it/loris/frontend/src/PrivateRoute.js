import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, isSignedIn, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => isSignedIn ? (<Component {...props} />) : (null)
            }
        />
    );
};

export default PrivateRoute;