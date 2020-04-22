import React, { useContext } from 'react'
import { EmployeeContext } from '../pages/Availability'

export default (props) => {

    // day is a string like "Sunday"
    // start, end
    const { day, start, end, selection, index } = props
    const { availability, setAvailability } = useContext(EmployeeContext)

    const handleSelection = (type, objectReference) => {
        if(type === 'unavailable') {
            objectReference.isAvailable = false
            objectReference.isAllDay    = true
            // objectReference.startTime   = ''//: '00:00 AM',
            // objectReference.endTime     = ''// : '12:00 PM'
            objectReference.selection = 'unavailable'
        }
        if(type === 'allDay') {
            objectReference.isAvailable = true
            objectReference.isAllDay = true
            // objectReference.startTime = '00:00'
            // objectReference.endTime = '24:00'
            objectReference.selection = 'allDay'
        }
        /*
        // handled else where
        if(type === 'dateRange') {
            objectReference = {
                isAvailable: true,
                isAllDay: true,
                startTime: objectReference.start,
                endTime: objectReference.end
            }
        }*/
    }

    const selectedRadioInput = (day, type) => {
        // console.log(type)// 'allDay' | 'unavailable' | 'dateRange'
        // console.log(day)// 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
        const _availabilityCopy = availability.slice();
        const _objectIndex = _availabilityCopy.findIndex(o => o.day === day)
        handleSelection(type, _availabilityCopy[_objectIndex])
        setAvailability(_availabilityCopy)
    }

    const radioRangeSelected = () => {
        const _availabilityCopy = availability.slice();
        const i = availability.findIndex(o => o.day === day)
        _availabilityCopy[i].selection = 'dateRange'
        setAvailability(_availabilityCopy)
    }

    const changeValue = (e, isFrom) => {
        const value = e.target.value
        const _availabilityCopy = availability.slice();
        const _objectIndex = _availabilityCopy.findIndex(o => o.day === day)
        const _ObjectCopy = availability[_objectIndex]
        _ObjectCopy.selection = 'dateRange'
        if(isFrom) {
            _ObjectCopy.start = value
        } else {
            _ObjectCopy.end = value
        }
        setAvailability(_availabilityCopy)
    }


    return <p className="flexbox-wrapper vertical">
    <h3 className="italic uppercase text-alignedCenter spacedText redLine marginTop-15 pad-bottom-15">{day}</h3>
    <div className="flexbox-centeredEvenly flexbox-wrapper DateComponentSpacing">
        
        <label className="flexbox-centered flexbox-item flexbox-wrapper" onClick={() => selectedRadioInput(day, 'allDay')}>
            <input tabIndex={index} checked={selection==='allDay'} className="pointerCursor" type="radio" id={day + "_A"} name={day} value="male"/>
            <label className="pointerCursor" for={day + "_A"}>All Day</label>
        </label>

        <label  className="flexbox-centered flexbox-item flexbox-wrapper">
            <div className="flexbox-wrapper flexbox-item">
                <span className="flexbox-centered flexbox-wrapper" style={{paddingRight: "20px", margin: '0'}}>
                    <input tabIndex={index} onClick={radioRangeSelected} checked={selection==='dateRange'} className="pointerCursor" type="radio" id={day + "_B"} name={day} value="male"/>
                </span>
                <label className="pointerCursor flexbox-item" for={day + "_B"}>
                    <p className="flexbox-wrapper">
                        <span className="flexbox-item">From: </span> 
                        <input className="flexbox-item" type="time" name="appt" onChange={(e) => changeValue(e, true)} value={start} />
                    </p>
                    <p className="flexbox-wrapper">
                        <span className="pointerCursor flexbox-item">To: </span>
                        <input className="pointerCursor flexbox-item" type="time" name="appt" onChange={(e) => changeValue(e, false)}  value={end}/>
                    </p>

                </label>
            </div>
        </label>
        <label className="flexbox-centered flexbox-item flexbox-wrapper" onClick={() => selectedRadioInput(day, 'unavailable')}>
            <input tabIndex={index} checked={selection==='unavailable'} className="pointerCursor" type="radio" id={day + "_C"} name={day} value="unavailable"/>
            <label className="pointerCursor" for={day + "_C"}>Not Available</label>
        </label>
    </div>
</p>
}