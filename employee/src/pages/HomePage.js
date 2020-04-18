import React from 'react';
import Cal from '../components/calendar';
import events from '../components/calendar-setup'
import EmployeeInfo from '../components/Employee-Info';
import ScheduleDetails from '../components/Schedule-Details';
import ScheduleDetail from '../components/Schedule-Details';

const HomePage = () => (
    <>
    <div id="left_sidebar">
        <EmployeeInfo/>
    </div>

    <div id="focus" className="flexbox-item">
        <Cal events = {events}/>
    </div>

    <div id='right_sidebar'>
        <div>
        <ScheduleDetail />
        </div>
    </div>

    </>
)
export default HomePage;