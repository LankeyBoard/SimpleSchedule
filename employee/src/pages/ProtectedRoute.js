import React from 'react';
import { Redirect } from 'react-router-dom';
import { Settings } from './../services/Settings'
// stole from the following exmaple
// https://reacttraining.com/react-router/web/api/Redirect
export default (props) => {

    const { isLoggedIn, children, userData, adminOnly } = props
    const renderChild = <>{children}</>
    const _redirectedComponent = <Redirect to="/login"/>

    if(Settings.isLoggedInDefault) {
        return renderChild
    }
    const _protectedRender = isLoggedIn ? renderChild : _redirectedComponent

    let role = ''
    const roleDefined = userData && userData.role
    if(roleDefined) {
        role = userData.role
    }

    if(adminOnly) { 
        return role === 'manager' ? _protectedRender : _redirectedComponent
    }

    return _protectedRender

}