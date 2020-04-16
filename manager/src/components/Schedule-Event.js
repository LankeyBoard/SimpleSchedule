import React from 'react';

const Shift = ({title, startTime, endTime, startDate, endDate, desc}) => {
	return (
		<section>
            <h3>{title}</h3>
            <p className="shiftTime">{startTime}, {startDate} - {endTime}, {endDate} </p>
            <p>Notes: {desc}</p>
		</section>
	)
}

export default Shift;