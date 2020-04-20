import React from 'react'
import { Redirect } from 'react-router-dom'

// stole from the following exmaple
// https://reacttraining.com/react-router/web/api/Redirect
export default (props) => {

    const { isLoggedIn, children } = props

    return isLoggedIn ? <>{children}</> : <Redirect to="/login"/>
}