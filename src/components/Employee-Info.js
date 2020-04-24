import React, { useContext } from 'react'
import { AppContext } from './../App'
import { Settings } from './../services/Settings'
import { HomePageContext } from './../pages/HomePage'
export default () => {

    const { userData } = useContext(AppContext)
    const { counts, showAllEvents, setShowAllEvents } = useContext(HomePageContext)
    const { myShiftCount, ttlShiftCount } = counts
    const isAdmin = !!(userData && userData.role === "manager")
    let imgSrc = Settings.defaultImageUrl

    if(userData && userData.avatar) {
        imgSrc = userData.avatar
    }
    
    // dynamically will render this option
    const renderDashboardOptions = (isAdmin) =>  isAdmin ? <div style={{margin: '30px 0'}} className="flexbox-item">
            <div className="flexbox-centered flexbox-wrapper">
                <label className="pointerCursor">
                    <input checked={showAllEvents} onClick={() => setShowAllEvents(!showAllEvents)} className="checkboxRightMargin" type="checkbox"/>Show all events
                </label>
            </div>
        </div> : null

    // only admins can do this...
    const showTotalCount = isAdmin => isAdmin ?                     
        <div className="flexbox-wrapper">
            <span>Total Shift #: </span>
            <span className="flexbox-item text-alignedCenter">{ttlShiftCount}</span>
        </div> : null


    return <div id="left_sidebar" className="flexbox-wrapper vertical">
        <div className="flexbox-centered flexbox-item flexbox-wrapper vertical">
            <div className="flexbox-centered flexbox-wrapper">
                <img width="200" alt="good employee" src={imgSrc} />
            </div>
            <div className="flexbox-centered flexbox-wrapper">
                <div className="cardBottom">
                    <div className="flexbox-wrapper">
                        <span>Name:</span>
                        <span className="flexbox-item text-alignedCenter">{userData.firstName} {userData.lastName}</span>
                    </div>
                    <div className="flexbox-wrapper">
                        <span>Role:</span>
                        <span className="flexbox-item text-alignedCenter">{userData.role}</span>
                    </div>

                    <div className="flexbox-wrapper">
                        <span>My Shifts: </span>
                        <span className="flexbox-item text-alignedCenter">{myShiftCount}</span>
                    </div>

                    {showTotalCount(isAdmin)}

                </div>
            </div>
        </div>


        {renderDashboardOptions(isAdmin)}

        <div className="flexbox-item">

        </div>
</div>

}