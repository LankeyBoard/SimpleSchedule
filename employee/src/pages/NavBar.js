import React from 'react'
import { Link } from 'react-router-dom'
import { Settings } from './../services/Settings'


export default (props) => {
    // userData && userData.role
    const { isLoggedIn, toggled, isManager } = props

    const logText = isLoggedIn ? "Log Out" : "Log In"

    const getNavItems = () => {
        const NavigationElements = []

        NavigationElements.push(<li key="home"><Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/">View Schedule</Link></li>)

        if(isManager || Settings.isLoggedInDefault) {
            NavigationElements.push(<li key="information"><Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/info">View Info</Link></li>)
        }

        NavigationElements.push(<li key="timeOff"><Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/TimeOff">Request Time Off</Link></li>)
        return NavigationElements
    }


    return <nav id="navigation_container">
                <ul className="flexbox-wrapper nav">
                    {isLoggedIn || Settings.isLoggedInDefault ? getNavItems() : null}
                    {/* SPACER */}
                    <div className="flexbox-item"></div>

                    {/* should fire function instead... */}
                    <li onClick={() => toggled(isLoggedIn ? 'logout' : 'login')} className="logout">
                        <Link className="flexbox-wrapper flexbox-item flexbox-centered" to="/login">{logText}</Link>
                    </li>
                </ul>
            </nav>
}