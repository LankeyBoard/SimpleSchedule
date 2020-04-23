import React, { useContext } from 'react'
import { ViewRequestContext } from './ViewRequests'
import Axios from 'axios'
import moment from 'moment'

export const Requests = () => {
    const { events, setEvents } = useContext(ViewRequestContext)
    const showName = (name) => {
        if(name) {
            return name
        } else {
            return '*Employee Not Identified*'
        }
    }

    const takeAction = (eventid, status) => {
        const requestObject = {
            eventid,
            status
        }
        Axios.post('/api/events/timeOffAction',requestObject).then((apiResponse) => {
            
            console.dir(apiResponse)
        }).catch((apiError) => {
            
            console.dir(apiError)
        })
        const eventsCopy = [...events]
        const i = eventsCopy.findIndex(x => x._id === eventid)
        eventsCopy.splice(i, 1)
        setEvents(eventsCopy)
    }

    /* 
        event has the following properties...
            - id
            - title
            - start
            - end
            - description nullable<string>
    */
    const renderRequestList = () => {
        
        if(!Array.isArray(events)) return null

        return events.map((event) => {
            const { _id, title, start, end, description, fullName } = event
            return <li key={_id}>
            <h3>{title}</h3>
            <p>{showName(fullName)}</p>
            <p className="shiftTime">{moment(start).format("MMM, Do, LT")} - {moment(end).format("MMM, Do, LT")}</p>
            {description ? <p>{description}</p> : <p>*No Details Provided*</p>}
            <button onClick={() => takeAction(_id,"accepted")} className="pointerCursor approveBtn">Approve</button>
            <button onClick={() => takeAction(_id,"rejected")} className="pointerCursor rejectBtn">Reject</button>
        </li>
        })
    }

    return <ul id="requestList">
                {renderRequestList()}
            </ul>
}