import React from 'react';
import Cal from '../components/calendar';
import events from '../components/calendar-setup'

const HomePage = () => (
    <>
    <h1>Home Page</h1>
    <p>This is where the schedule should be displayed</p>
    <div className="focus">
    <Cal events = {events}/>
    </div>
    </>
)
export default HomePage;