import React from 'react'
import Shift from './Schedule-Event'



export default ({shifts}) => {

    const calcTotalHours = shifts => {
        let totalHrs = 0;
        for(let i = 0; i<shifts.length; i++){
            totalHrs+= shifts[i].end.getHours()-shifts[i].start.getHours();
        }
        return totalHrs;
    }


    return <div id='right_sidebar'>
        <h2>Schedule Details</h2>
        <p>Hours: {calcTotalHours(shifts)}</p>
        <p>Shift Details</p>
        {shifts.map((shift, i) => 
                <Shift 
                    key={i}
                    title={shift.title} 
                    startTime={shift.start}
                    endTime={shift.end}
                    desc={shift.desc}
                    />)}
    </div>
}