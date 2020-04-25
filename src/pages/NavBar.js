import React, { useContext } from 'react'
import { NavLink  } from 'react-router-dom'
import { Settings } from './../services/Settings'
import { AppContext } from './../App'

export default (props) => {

    const { userData, isManager, changeLoginState } = useContext(AppContext)
    let imgSrc = Settings.defaultImageUrl
    if(userData && userData.avatar) {
        imgSrc = userData.avatar
    }

    // userData && userData.role
    const { isLoggedIn } = props

    const logText = isLoggedIn ? "Log Out" : "Log In"

    const getNavItems = () => {
        const NavigationElements = []

        NavigationElements.push(<li key="home"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/">View Schedule</NavLink></li>)

        if((Settings.isLoggedInDefault && Settings.useAdminAccount)) {
            NavigationElements.push(<li key="information"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/info">Availability</NavLink></li>)
        }
        if(isManager || (Settings.isLoggedInDefault && Settings.useAdminAccount)) {
            NavigationElements.push(<li key="createShifts"><NavLink exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/createShifts">Make a Schedule</NavLink></li>)
        }
        if(isManager || (Settings.isLoggedInDefault && Settings.useAdminAccount)) {
            NavigationElements.push(<li key="viewRequests"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/viewRequests">View Time Off Requests</NavLink></li>)
        }
        if(isManager || (Settings.isLoggedInDefault && Settings.useAdminAccount)) {
            NavigationElements.push(<li key="ManageUsers"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/ManageUsers">Manage Users</NavLink></li>)
        }

        NavigationElements.push(<li key="timeOff"><NavLink  exact activeClassName="activeNavigation" className="flexbox-wrapper flexbox-item flexbox-centered" to="/timeOff">Request Time Off</NavLink></li>)
        return NavigationElements
    }


    return <nav id="navigation_container">
                <ul className="flexbox-wrapper nav">
                    {isLoggedIn || Settings.isLoggedInDefault ? getNavItems() : null}
                    
                    {/* SPACER */}
                    <div className="flexbox-item"></div>

                    <div>
                        <img alt="user icon logo" className="imageLocation" src={imgSrc}/>
                    </div>

                    {/* should fire function instead... */}
                    <li onClick={() => changeLoginState(!isLoggedIn)} className="logout">
                        <NavLink className="flexbox-wrapper flexbox-item flexbox-centered" to="/login">{logText}</NavLink>
                    </li>
                </ul>
            </nav>
}