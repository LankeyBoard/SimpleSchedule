import React from 'react'
import { NavLink  } from 'react-router-dom'
import { Settings } from './../services/Settings'


export default (props) => {
    // userData && userData.role
    const { isLoggedIn, toggled, isManager } = props

    const logText = isLoggedIn ? "Log Out" : "Log In"

    const getNavItems = () => {
        const NavigationElements = []

        NavigationElements.push(<li key="home"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/">View Schedule</NavLink></li>)

        if(isManager || Settings.isLoggedInDefault) {
            NavigationElements.push(<li key="information"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/info">Availability</NavLink></li>)
        }
        if(isManager || Settings.isLoggedInDefault) {
            NavigationElements.push(<li key="createShifts"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/createShifts">Make a Schedule</NavLink></li>)
        }

        NavigationElements.push(<li key="timeOff"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/TimeOff">Request Time Off</NavLink></li>)
        return NavigationElements
    }


    return <nav id="navigation_container">
                <ul className="flexbox-wrapper nav">
                    {isLoggedIn || Settings.isLoggedInDefault ? getNavItems() : null}
                    {/* SPACER */}
                    <div className="flexbox-item"></div>

                    {/* should fire function instead... */}
                    <li onClick={() => toggled(isLoggedIn ? 'logout' : 'login')} className="logout">
                        <NavLink className="flexbox-wrapper flexbox-item flexbox-centered" to="/login">{logText}</NavLink>
                    </li>
                </ul>
            </nav>
}