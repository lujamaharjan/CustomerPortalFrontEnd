import React from 'react';
import { Route, Redirect } from "react-router-dom";
function RouteGuard({ component: Component, ...rest }) {
    const token = JSON.parse(localStorage.getItem("access_token"));
    let auth;
    if(token) auth = true;
    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default RouteGuard;
