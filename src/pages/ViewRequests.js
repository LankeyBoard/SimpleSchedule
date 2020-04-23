import React from "react";
import moment from "moment";

const events = [    {
  id: '1234567890',
  start:  moment().subtract(2, "hours").toDate(),
  end:    moment().toDate(),
  title:  "Meeting about the project",
  description: "a simple description of the shift"
},
{
  id: '312321321',
  start:  moment().add(2, "hours").toDate(),
  end:    moment().add(3, "hours").toDate(),
  title:  "2nd Shift"
}];
// const localizer = momentLocalizer(moment);  
const employees = ["Emp1", "Emp2"];

function Requests(props){
    const requestList =(
        <ul id="requestList">
            {props.events.map((event) =>
            <li key={event.id}>
                <h3>{event.title}</h3>
                <p className="shiftTime">{moment(event.start).format("MMM, Do, LT")} - {moment(event.end).format("MMM, Do, LT")}</p>
                <p>{event.description}</p>
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
