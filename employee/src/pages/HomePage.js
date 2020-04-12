import React from 'react';
import Cal from '../components/calendar';
import events from '../components/calendar-setup'
import EmployeeInfo from '../components/Employee-Info';
import ScheduleDetails from '../components/Schedule-Details';
import ScheduleDetail from '../components/Schedule-Details';

const HomePage = () => (
    <>
    <h1>Home Page</h1>
    <p>This is where the schedule should be displayed</p>
    <div className = "left_sidebar">
        <EmployeeInfo/>
    </div>
    <div className = 'right_sidebar'>
        <ScheduleDetail />
    </div>
    <div className="focus">
        <Cal events = {events}/>
    </div>

    </>
)
export default HomePage;