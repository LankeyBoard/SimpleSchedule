import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const { isLoggedIn, toggled, loginCallBack } = props
    const logText = isLoggedIn ? "Log In" : "Log Out"
    return <nav id="navigation_container">
        <ul className="flexbox-wrapper nav">
            <li>
                <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/">View Schedule</Link>
            </li>
            <li>
                <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/info">View Info</Link>
            </li>
            <li>
                <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/TimeOff">Request Time Off</Link>
            </li>

            {/* SPACER */}
            <div className="flexbox-item"></div>

            {/* should fire function instead... */}
            <li onClick={toggled} className="logout">
                <Link onClick={loginCallBack} className="flexbox-wrapper flexbox-item flexbox-centered" to="/">{logText}</Link>
            </li>
        </ul>
    </nav>
}