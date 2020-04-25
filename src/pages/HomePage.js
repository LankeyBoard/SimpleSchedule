import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import EmployeeInfo from './../components/Employee-Info'
import ScheduleDetail from './../components/Schedule-Details'
import { AppContext } from './../App'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import EventService from './../services/EventService'

const localizer = momentLocalizer(moment)
export const HomePageContext = React.createContext()


export default () => {

    const { userData, toggleModal } = useContext(AppContext)
    const [events, setEvents] = useState([])
    const [showAllEvents, setShowAllEvents] = useState(false)


    useEffect(() => {
        Axios.get('/api/events/getAllEvents').then((AxiosResponse) => {
            if(AxiosResponse && AxiosResponse.data && Array.isArray(AxiosResponse.data.events)) {
                const allEvents = AxiosResponse.data.events.map(i => {
                    return  {
                        ...i,
                        start:  moment(i.start).toDate(),
                        end:    moment(i.end).toDate()
                    }
                })
                setEvents(allEvents)
            }
        }).catch((axiosError) => {
            console.log(axiosError)
        })
    }, [])


    const GetEvents = (events, userid) => {
        let UsersEvents = [];
        for(let i =0; i<events.length; i++){
            if(events[i].userObjectId.localeCompare(userid) === 0 && !events[i].isTimeOff){
                UsersEvents.push(events[i])
            }
        }
        return UsersEvents;
    }

    const onSelectEvent = (eventDetails) => {
        const configuration = {
            title: "Event Details", 
            style: {
                height: '300px',
                width: '600px'
            },
            type: 'eventDetails',
            properties: eventDetails
        }
        toggleModal(configuration)
    }

    // styling events conditionally...
    const eventPropGetter = eventDetails => {
        return EventService.getEventStyle(eventDetails)
    }

    let ttlShiftCount = events.length
    let userEvents = GetEvents(events, userData._id);
    let myShiftCount = userEvents.length
    let _userEvents = showAllEvents ? events : userEvents

    const counts = {
        myShiftCount, 
        ttlShiftCount
    }

    return (<HomePageContext.Provider value={{showAllEvents, setShowAllEvents, counts}}>
            <div className="flexbox-wrapper flexbox-item">
                <EmployeeInfo />
                <div id="focus" className="flexbox-item">
                    <div className="Calendar">
                        <Calendar
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView="month"
                            events={_userEvents}
                            onSelectEvent={onSelectEvent}
                            eventPropGetter={eventPropGetter}
                        />
                    </div>
                </div>
                <ScheduleDetail shifts={_userEvents} />
            </div>
        </HomePageContext.Provider>
    )
}
