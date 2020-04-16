import React from 'react';
import Shift from './Schedule-Event';
import shifts from '../shifts';

const ScheduleDetail = () => (
    
    <>
    <h2>Schedule Details</h2>
    <p>Total Hours: 20hrs</p>
    <p>Shift Details</p>

    {shifts.map(
        (shift, i) => 
            <Shift 
                key={i}
                title={shift.title} 
                startTime={shift.startTime}
                endTime={shift.endTime}
                startDate={shift.startDate}
                endDate={shift.endDate}
                desc={shift.desc}
                />
    )}

    </>
);

export default ScheduleDetail;

