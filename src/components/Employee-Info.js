import React from 'react';
import '../css/employeInfo.css'

export default (props) => {
    
    const { avatarUrl } = props

    return <div id="left_sidebar" className="flexbox-wrapper vertical">

        <div className="flexbox-centered flexbox-wrapper">
            <img width="200" alt="good employee" src={avatarUrl} />
        </div>

        <div className="flexbox-centered flexbox-wrapper">
            <div className="cardBottom">
                <p>First Last</p>
                <p>Role</p>
                <p>Unassigned Shifts: 1</p>
            </div>
        </div>
</div>

}