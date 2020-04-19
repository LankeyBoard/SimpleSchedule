import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const { isLoggedIn, toggled } = props
    const logText = isLoggedIn ? "Log Out" : "Log In"
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
                <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/">{logText}</Link>
            </li>
        </ul>
    </nav>
}