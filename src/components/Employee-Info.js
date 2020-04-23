import React, { useContext } from 'react';
import '../css/employeInfo.css'
// import { AppContext } from './../App';

export default ({userData, shiftCount}) => {

    return <div id="left_sidebar" className="flexbox-wrapper vertical">

        <div className="flexbox-centered flexbox-wrapper">
            <img width="200" alt="good employee" src={userData.avatar} />
        </div>

        <div className="flexbox-centered flexbox-wrapper">
            <div className="cardBottom">
                <p>{userData.fname} {userData.lname}</p>
                <p><i>{userData.roll}</i></p>
                
                <p>Shifts: {shiftCount}</p>
            </div>
        </div>
</div>

}