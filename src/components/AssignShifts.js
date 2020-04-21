import React from 'react'
// import employeeDropdown from './employeeDropdown'

const AssignShifts = ({events, employees}) => {
    return(
        <>
        <p>Select an employee for each shift</p>
        <ul>
            {events.map((ev) =>
            <>
                <li>{ev.title}</li>
                <select>
                {employees.map((emp, key) =>
                <option value = {emp}>{emp}</option>
                )}
                </select>
            </>                                 
            )}
        </ul>
        </>
    );
};
export default AssignShifts;

