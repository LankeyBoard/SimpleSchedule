import React from 'react'
import moment from 'moment'





const ViewRequests = () =>{
    let events = [    {
        id: '1234567890',
        start:  moment().subtract(2, "hours").toDate(),
        end:    moment().toDate(),
        title:  "Meeting about the project",
        description: "a simple description of the shift",
        status: "pending"
        },
        {
        id: '312321321',
        start:  moment().add(2, "hours").toDate(),
        end:    moment().add(3, "hours").toDate(),
        title:  "2nd Shift",
        status: "pending"
        }];
    return(
        <>
        <h3>Approve/Deny Time off Requests</h3>
        {events.map(({ev})=>
        <div className="timeOffRequest">
            <h3>{ev}</h3>
        </div>
        )}
        </>
    )     
}
export default ViewRequests;
    

