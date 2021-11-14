import React, { ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import SessionStorageHelper from "../../tools/SessionStorageHelper";

function ProtectedRoute(theProps: { path: string, component: ComponentType<any> | undefined }) {
    const token = SessionStorageHelper.getToken();

    if (token !== "") {
        console.log("isAuthenticated: true");
        return (
            <Route path={theProps.path} component={theProps.component} />
        );
    } else {
        console.log("isAuthenticated: false");
        return (
            <Redirect to="/" />
        );
    }
}

export default ProtectedRoute;