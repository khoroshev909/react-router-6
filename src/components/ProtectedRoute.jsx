import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../store/authSlice";
function ProtectedRoute({ element, redirectTo }) {
    const location = useLocation()
    const isLoggedIn = useSelector(isLoggedInSelector());

    if (!isLoggedIn) return <Navigate
        to={redirectTo ? redirectTo : "/auth/login"}
        state={{ referrer: location }} />

    return element

/*    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/auth/login",
                                state: {
                                    referrer: props.location,
                                },
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );*/
}
export default ProtectedRoute;
