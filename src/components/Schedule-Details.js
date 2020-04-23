import React from 'react'
import Shift from './Schedule-Event'
//import shifts from './../shifts'// should NOT be hard coded...
function TotalHours(shifts){
    let totalHrs = 0;
    for(let i = 0; i<shifts.length; i++){
        totalHrs+= shifts[i].end.getHours()-shifts[i].start.getHours();
    }
    return totalHrs;
}
export default ({shifts}) => <div id='right_sidebar'>
        <h2>Schedule Details</h2>
        <p>Hours: {TotalHours(shifts)}</p>
        <p>Shift Details</p>
        {shifts.map(
            (shift, i) => 
                <Shift 
                    key={i}
                    title={shift.title} 
                    startTime={shift.start}
                    endTime={shift.end}
                    // startDate={shift.startDate}
                    // endDate={shift.endDate}
                    desc={shift.desc}
                    />
        )}
    </div>