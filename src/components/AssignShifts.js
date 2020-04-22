import React from 'react'
import moment from 'moment';
// import employeeDropdown from './employeeDropdown'

const AssignShifts = ({events, employees}) => {
    var startDate
    var endDate
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
                    <label for="desc">Shift Description: </label>

                    <select className="shiftEmployees">
                        <option value="unassigned">unassigned</option>
                    {employees.map((emp, key) =>
                    <option value = {emp}>{emp}</option>
                    )}
                    </select>
                    <textarea className="ShiftDesc" form="createShifts" value={ev.description}/>
                </div> 
                </>                                
                )}
            </ul>
        </form>
        </div>


        <button>Assign Shifts</button>

        </>
    );
};
export default AssignShifts;

