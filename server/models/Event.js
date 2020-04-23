/*
interface Ievent  
{
    start:  Date
    end:    Date
    title:  String
    allDay: Boolean
    description: String
    userObjectId: String
    isTimeOff: Boolean
    status: 'pending' | 'accepted' | 'rejected'
}
*/
const mongoose = require("mongoose")


// TimeOff is an event
// Shift is an event
const ScheduleSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // this would be like "Mourning Shift"
    title: {
        type: String,
        required: true
    },
    allDay: {
        type: Boolean,
        required: true
    }, 
    // description like Clean the fryer
    description: {
        type: String,
        required: false
    },
    // _userId
    userObjectId: {
        type: String,
        required: true
    },
    isTimeOff: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,// would hold 'pending' | 'accepted' | 'rejected'
        required: false
    }
})

module.exports = Schedule = mongoose.model('event', ScheduleSchema)