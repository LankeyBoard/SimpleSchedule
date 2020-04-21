import React from 'react';
import { Redirect } from 'react-router-dom';
// stole from the following exmaple
// https://reacttraining.com/react-router/web/api/Redirect
export default (props) => {

    const { isLoggedIn, children, userData, adminOnly } = props

    const _protectedRender = isLoggedIn ? <>{children}</> : <Redirect to="/login"/>

    let role = ''
    const roleDefined = userData && userData.role
    if(roleDefined) {
        role = userData.role
    }

    if(adminOnly) {
        return role === 'manager' ? _protectedRender : <Redirect to="/login"/>
    }

    return _protectedRender

}