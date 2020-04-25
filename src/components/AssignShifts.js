import React, { useContext } from 'react'
import moment from 'moment';
import { ShiftContext } from './../pages/CreateShift'
import Axios from 'axios'

const AssignShifts = () => {

    // availabilities
    const { events, users, setEvents } = useContext(ShiftContext)

    const nameDropdown = users.map(i => {return {name: `${i.firstName} ${i.lastName}`, id: i._id}}).sort((a, b) => a < b ? -1 : 1)

    const MakeDropDown = () => nameDropdown.map((emp) => <option key={emp.id} value={emp.id}>{emp.name}</option>)

    const selectionChanged = (e, eventId) => {
        const userId = e.target.value
        const eventsCopy = [...events]
        const eventCopy = eventsCopy.find(i => i._id === eventId)
        eventCopy.userObjectId = userId
        eventCopy.newAssignment = true
        eventCopy.status = 'pending'//yellow
        setEvents(eventsCopy)
    }

    const createShifts = () => {
        const newAssignment = events.filter(l => l.newAssignment === true && l.userObjectId !== "unassigned")
        // extracting all shifts...
        const requestObj = newAssignment.map(i => {
            return {
                ...i,
                allDay: new Date(i.start).getHours() === 0 && new Date(i.end).getHours() === 0,
                description: i.description || '',
                userObjectId: i.userObjectId || '',
                isTimeOff: false,
                status: ''
            }
        })

        if(!Array.isArray(requestObj) || requestObj.length > 0) {
            Axios.post('/api/events/assignShifts', {events: requestObj}).then((apiResponse) => {
                console.dir(apiResponse)
                const eventsCopy = [...events]
                apiResponse.data.events.forEach(o => {
                    let ObjectRef = eventsCopy.find(i => i._id === o._id)
                    ObjectRef.status = ''
                })
                setEvents(eventsCopy)
            }).catch((apiError) => {
                console.dir(apiError)
            })
        } else {
            alert('All created shifts are unassigned, unable to save request.\nPlease assign at least one Shift to an employee.')
        }
    }

    const onTextAreaChange = (e, eventid) => {
        const text = e.target.value
        const eventsCopy = [...events]
        const eventCopy = eventsCopy.find(i => i._id === eventid)
        eventCopy.description = text
        setEvents(eventsCopy)
    }

    const deleteEvent = (eventid) => {

        // should make an API call here to delete the event...
        Axios.post('/api/events/deleteEvent', {eventid}).then((apiResponse) => {
            debugger
            console.dir(apiResponse)
            
            const eventsCopy = [...events]
            const i = eventsCopy.findIndex(k => k._id === eventid)
            eventsCopy.splice(i,1)
            setEvents(eventsCopy)

        }).catch((axiosError) => {
            debugger
            console.dir(axiosError)
        })
    }

    const renderAssignShiftsCards = () => {

        if(!Array.isArray(events) || events.length === 0) return null

        return events.map((ev) => <div key={ev._id}>
            <li className="shiftTitle">{ev.title}</li>
            <p className="shiftTime">{moment(ev.start).format("MMM, Do, LT")} - {moment(ev.end).format("MMM, Do, LT")}</p>
            <select className="shiftEmployees" onChange={(e) => selectionChanged(e, ev._id)}>
                <option value="unassigned">unassigned</option>
                {MakeDropDown()}
            </select>
            
            <textarea 
                className="ShiftDesc" 
                value={ev.description} 
                onChange={(e) => onTextAreaChange(e, ev._id)}
            />
            <button id={ev.title} onClick={() => deleteEvent(ev._id)} className="delete">Delete Shift</button>
        </div>)
    }



    const renderCreateShiftButton = () => {
        if(!Array.isArray(events) || events.length === 0) return null
        return <button onClick={createShifts} id="shifts">Create Shifts</button>
    }

    const dynamicCallToAction = () =>  Array.isArray(events) && events.length > 0 ? <p>Select an employee for each shift</p> : <p>Please create a new event</p>;

    return(
        <div className="AssignShifts" id="right_sidebar">
            
            <h3>Assign Shifts</h3>
            <div id="scrollable">
                {dynamicCallToAction()}
                <div id="createShifts">
                    <ul>
                        {renderAssignShiftsCards()}
                    </ul>
                </div>
            </div>
            {renderCreateShiftButton()}
        </div>
    );
};
export default AssignShifts;

