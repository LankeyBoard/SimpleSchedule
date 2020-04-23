import React from 'react';
import moment from 'moment';

const Shift = ({title, startTime, endTime, startDate, endDate, desc}) => {
	return (
		<section>
            <h3>{title}</h3>
            <p className="shiftTime">{moment(startTime).format("MMM, Do, LT")} - {moment(endTime).format("MMM, Do, LT")}</p>
            <p>Notes: {desc}</p>
		</section>
	)
}

export default Shift;