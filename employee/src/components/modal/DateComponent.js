import React from 'react'

export default (props) => {

    const { day } = props

    return <p className="flexbox-wrapper vertical">
    <h3>{day}</h3>
    <label>
        <input type="radio" id={day + "_A"} name={day} value="male"/>
        <label for={day + "_A"}>All Day</label>
    </label>
    <label>
        <input type="radio" id={day + "_B"} name={day} value="male"/>
        <label for={day + "_B"}>
            From <input type="time" name="appt" min="00:00" max="24:00"/>
            To <input type="time" name="appt" min="00:00" max="24:00"/>
        </label>
    </label>
</p>
}