import React, { useState, useContext } from 'react';
import DateComponent from '../components/DateComponent'
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { AppContext } from './../App'


export const EmployeeContext = React.createContext()
const today = new Date()



//AppContext
export const Availability = () => {

    const { userData } = useContext(AppContext)

    const [startDate, setStartDate] = useState(today)
    const [availability, setAvailability] = useState([
        {
            day: 'Sunday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Monday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Tuesday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Wednesday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Thursday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Friday',
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: 'unavailable'
        },
        {
            day: 'Saturday',
            isAvailable: false,
            isAllDay: false,
            start: '',//        12:30
            end: '',//          15:59
            selection: 'unavailable'
        },
    ])



    const _buildForm = () => {
        return <form>
            <div>When is this availability starting?</div>
            <DatePicker minDate={today} todayButton="Today" selected={startDate} onChange={date => setStartDate(date)}/>
            <div>What are your preffered days off:</div>
            {availability.map((o, i) => <DateComponent key={o.day} day={o.day} start={o.start} end={o.end} selection={o.selection} index={i+1} />)}
        </form>
    }

    const saveForm = () => {

        const availabilityCopy = [...availability]
        let dateRangeAvail = availability.filter(i => i.selection === 'dateRange') || []
        dateRangeAvail.forEach(dateRangeItem => {
            let index = availabilityCopy.findIndex(x => x.day === dateRangeItem.day)
            let [startHour, startMinute] = dateRangeItem.start.split(':')
            startHour       = parseInt(startHour)
            startMinute     = parseInt(startMinute)
            let [endHour, endMinute] = dateRangeItem.end.split(':')
            endHour         = parseInt(endHour)
            endMinute       = parseInt(endMinute)

            availabilityCopy[index] = {
                ...dateRangeItem,
                start: {
                    hour: startHour,
                    minute: startMinute
                },
                end: {
                    hour: endHour,
                    minute: endMinute
                }
            }
        })

        let otherDates = availability.filter(i => i.selection !== 'dateRange') || []
        otherDates.forEach(dateItem => {
            let index = availabilityCopy.findIndex(x => x.day === dateItem.day)
            availabilityCopy[index] = {
                ...dateItem,
                start: {
                    hour: 0,
                    minute: 0
                },
                end: {
                    hour: 0,
                    minute: 0
                }
            }
        })

        const requestObject = {
            availability: availabilityCopy,
            userId: userData._id,
            startingFrom: startDate
        }


        Axios.post('/api/availability/create', requestObject).then((apiResponse) => {
            debugger
            console.dir(apiResponse.data)
        }).catch((apiError) => {
            debugger
            console.dir(apiError)
        })




        /*
        availabilityCopy.map(dateRangeItem => {
            let _pointer = _availability.find(x => x.day === dateRangeItem.day)
            
            let [startHour, startMinute] = dateRangeItem.start.split(':')
            let [endHour, endMinute] = dateRangeItem.end.split(':')
            startHour       = parseInt(startHour)
            startMinute     = parseInt(startMinute)
            endHour         = parseInt(endHour)
            endMinute       = parseInt(endMinute)
            let myObject = {
                ...dateRangeItem,
                start: {
                    hour: startHour,
                    minute: startMinute
                },
                end: {
                    hour: endHour,
                    minute: endMinute
                }
            }
            _pointer =  myObject
        })
        */

        console.dir(requestObject)

    }

    let someIvalidDates = true
    let isDisabledSaveButton = false
    let buttonClass = 'btn-continue'
    const dateRangeSelections = availability.filter(i => i.selection === 'dateRange') || []
    someIvalidDates = Array.isArray(dateRangeSelections) && dateRangeSelections.length > 0
    const unavailableSelections = availability.filter(i => i.selection === 'unavailable') || []

    if((someIvalidDates && dateRangeSelections.some(k => k.start === '' || k.end === '')) || unavailableSelections.length === availability.length) {
        buttonClass += ' disabledButton'
        isDisabledSaveButton = true
    }

    /*
    dateRangeSelections.map(j => {
        const [startHour, startMinute] = j.start.split(':').map(l => parseInt(l))
        const [endHour, endMinute] = j.end.split(':').map(l => parseInt(l))
    })
    */

    return <EmployeeContext.Provider value={{availability, setAvailability}}>
            <div>
                <div className="modal-wrapper">
                <div className="modal-header">Availability Form</div>
                    <div className="modal-body">
                        <p>
                            <h3>Please update your availability</h3>
                            {_buildForm()}
                        </p>

                        <button disabled={isDisabledSaveButton} onClick={saveForm} className={buttonClass}>Save</button>

                    </div>
                </div>
            </div>
        </EmployeeContext.Provider>
}