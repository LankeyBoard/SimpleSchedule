import React from 'react'
import moment from 'moment';

const AssignShifts = ({events, employees}) => {
    return(
        <>
        <div id="scrollable">
        <p>Select an employee for each shift</p>
        <form id="createShifts">
            <ul>
                {events.map((ev) =>
                <>
                <div>
                    <li className="shiftTitle">{ev.title}</li>
                    <p className="shiftTime">{moment(ev.start).format("MMM, Do, LT")} - {moment(ev.end).format("MMM, Do, LT")}</p>
                    <select className="shiftEmployees">
                        <option value="unassigned">unassigned</option>
                    {employees.map((emp, key) =>
                    <option value = {emp}>{emp}</option>
                    )}
                    </select>

                    <textarea className="ShiftDesc" form="createShifts" value={ev.description}/>
                    <button id={ev.title} className="delete" >delete shift</button>
                </div> 
                </>                                
                )}
            </ul>
        </form>
        </div>


        <button id="shifts">Create Shifts</button>

        </>
    );
};
export default AssignShifts;

