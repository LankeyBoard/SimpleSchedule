import React from "react";
import moment from "moment";
//import e from "express";
// import EmployeeInfo from "../components/Employee-Info";

const events = [    {
  id: '1234567890',
  start:  moment().subtract(2, "hours").toDate(),
  end:    moment().toDate(),
  title:  "Meeting about the project",
  description: "a simple description of the shift",
  userObjectId: "223",
},
{
  id: '312321321',
  start:  moment().add(2, "hours").toDate(),
  end:    moment().add(3, "hours").toDate(),
  title:  "2nd Shift",
  userObjectId: "123",
}];

const empolyees = [ {
    userid: "123",
    firstName: "John",
    lastName: "Doe",
},
{
    userid: "223",
    firstName: "June",
    lastName: "Deer",
}];

function EmployeeInfo(props){
    let event = props.event;
    for(let i=0; i<empolyees.length; i++){
        let comp = empolyees[i].userid.localeCompare(event.userObjectId)
        if(comp === 0){
            return(<p>{empolyees[i].firstName} {empolyees[i].lastName}</p>);
        }
    }
    return(<p>*Employee Not Identified*</p>)
}
function Requests(props){
    const requestList =(
        <ul id="requestList">
            {props.events.map((event) =>
            <li key={event.id}>
                <h3>{event.title}</h3>
                <i><EmployeeInfo event = {event}/></i>
                <p className="shiftTime">{moment(event.start).format("MMM, Do, LT")} - {moment(event.end).format("MMM, Do, LT")}</p>

                {event.description ? <p>{event.description}</p> : <p>*No Details Provided*</p>}
                <button className="approveBtn">approve</button>
                <button className="rejectBtn">reject</button>
            </li>)}
        </ul>
    )
    return (<>{requestList}</>);
}

class ViewRequests extends React.Component {

    render() {

        return (
            <>
            <h2>Approve/Reject Time Off Requests</h2>
            <ul>
                <Requests events={events}/>
            </ul>
            </>       
        );
    }
}

export default ViewRequests
