import React, { useState, useContext, useEffect } from 'react';
import DateComponent from '../components/DateComponent'
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { AppContext } from './../App'
import { daysOfWeek, availabilitySelection } from './../enums'



export const EmployeeContext = React.createContext()
const today = new Date()



//AppContext
export const Availability = () => {

    const { userData } = useContext(AppContext)

    const [startDate, setStartDate] = useState(today)
    const [availability, setAvailability] = useState([
        {
            day: daysOfWeek.sunday,
            dayIndex: 0,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.monday,
            dayIndex: 1,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.tuesday,
            dayIndex: 2,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.wednesday,
            dayIndex: 3,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.thursday,
            dayIndex: 4,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.friday,
            dayIndex: 5,
            isAvailable: false,
            isAllDay: false,
            start: '',
            end: '',
            selection: availabilitySelection.unavailable
        },
        {
            day: daysOfWeek.saturday,
            dayIndex: 6,
            isAvailable: false,
            isAllDay: false,
            start: '',//        12:30
            end: '',//          15:59
            selection: availabilitySelection.unavailable
        },
    ])


    /*
    interface IstartEndObjectRef {
        hour: number
        minute: number
    }
     */
    const toStringTime = (startEndObjectRef, selectionType) => {
        if(selectionType !== availabilitySelection.dateRange) {
            return ''
        }
        const { hour, minute } = startEndObjectRef;
        const _inject0 = timeNum => timeNum <= 9 ? "0"+timeNum : timeNum
        return _inject0(hour)+":"+_inject0(minute)
    }

    useEffect(() => {
        if(userData && (userData.id || userData._id)) {
            const requestObject = { userId: userData.id ||  userData._id }
            Axios.post('/api/availability/read', requestObject).then((apiResponse) => {
                const _availability = apiResponse.data.availabilityDocument.availability.map(o => {
                    return {
                        ...o,
                        start: toStringTime(o.start, o.selection),
                        end: toStringTime(o.end, o.selection),
                    }
                })
                setAvailability(_availability)
                setStartDate(new Date(apiResponse.data.availabilityDocument.startingFrom))

            }).catch((apiError) => {

                console.dir(apiError)

            })
        }
    }, [userData])



    const _buildForm = () => {
        return <div>
            <div>
                <div>When is this availability starting?</div>
                <DatePicker minDate={today} todayButton="Today" selected={startDate} onChange={date => setStartDate(date)}/>
            </div>
            <div>What are your preffered days off:</div>
            {availability.map((o, i) => <DateComponent key={o.day} day={o.day} start={o.start} end={o.end} selection={o.selection} index={i+1} />)}
        </div>
    }

    const saveForm = () => {

        const availabilityCopy = [...availability]
        let dateRangeAvail = availability.filter(i => i.selection === availabilitySelection.dateRange) || []
        dateRangeAvail.forEach(dateRangeItem => {
            let index = availabilityCopy.findIndex(x => x.day === dateRangeItem.day)
            let [startHour, startMinute] = dateRangeItem.start.split(':')
            startHour       = parseInt(startHour)
            startMinute     = parseInt(startMinute)
            let [endHour, endMinute] = dateRangeItem.end.split(':')
            endHour         = parseInt(endHour)
            endMinute       = parseInt(endMinute)
            
            if(endHour < startHour)
            {
                window.alert("Invalid Time Interval For an Entry");
            }

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

        let otherDates = availability.filter(i => i.selection !== availabilitySelection.dateRange) || []
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


        // making the API call like this...
        Axios.post('/api/availability/create', requestObject).then((apiResponse) => {
            console.dir(apiResponse.data)
        }).catch((apiError) => {
            console.dir(apiError)
        })
    }

    let someIvalidDates = true
    let isDisabledSaveButton = false
    let buttonClass = 'btn-continue'
    const dateRangeSelections = availability.filter(i => i.selection === availabilitySelection.dateRange) || []
    someIvalidDates = Array.isArray(dateRangeSelections) && dateRangeSelections.length > 0
    const unavailableSelections = availability.filter(i => i.selection === availabilitySelection.unavailable) || []

    if((someIvalidDates && dateRangeSelections.some(k => k.start === '' || k.end === '')) || unavailableSelections.length === availability.length) {
        buttonClass += ' disabledButton'
        isDisabledSaveButton = true
    }

    const buttonText = isDisabledSaveButton ? "Invalid" : "Save"

    return <EmployeeContext.Provider value={{availability, setAvailability}}>
            <div>
                <div className="modal-wrapper">
                <div className="modal-header">Availability Form</div>
                    <div className="modal-body">
                        <div>
                            <h3>Please update your availability</h3>
                            {_buildForm()}
                        </div>
                        <div className="flexbox-wrapper" style={{justifyContent: 'flex-end'}}>
                            <button disabled={isDisabledSaveButton} onClick={saveForm} className={buttonClass}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeContext.Provider>
}
