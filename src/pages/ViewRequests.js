import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from 'axios';
import { Requests } from './Requests'
export const ViewRequestContext = React.createContext()


export default () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        Axios.get('/api/events/viewTimeOffRequests').then((axiosResponse) => {
            const _events = axiosResponse.data.timeOffEvents.map(e => {
                return {
                    ...e,
                    start:  moment(e.start).toDate(),
                    end:    moment(e.end).toDate()
                }
            })
            setEvents(_events)
        }).catch((apiError) => {
            console.dir(apiError)
        })
      }, [])

    return <ViewRequestContext.Provider value={{events, setEvents}}>
        <h2>Approve/Reject Time Off Requests</h2>
        <Requests events={events}/>
    </ViewRequestContext.Provider>
}