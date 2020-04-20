import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    const { isLoggedIn, toggled } = props
    const logText = isLoggedIn ? "Log Out" : "Log In"

    const _LoggedInNavItems = [
        <li key="home">
            <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/">View Schedule</Link>
        </li>,
        <li key="information">
            <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/info">View Info</Link>
        </li>,
        <li key="timeOff">
            <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/TimeOff">Request Time Off</Link>
        </li>
    ]


    return <nav id="navigation_container">
                <ul className="flexbox-wrapper nav">
                    {isLoggedIn ? _LoggedInNavItems : null}
                    {/* SPACER */}
                    <div className="flexbox-item"></div>

                    {/* should fire function instead... */}
                    <li onClick={() => toggled(isLoggedIn ? 'logout' : 'login')} className="logout">
                        <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/login">{logText}</Link>
                    </li>
                </ul>
            </nav>
}