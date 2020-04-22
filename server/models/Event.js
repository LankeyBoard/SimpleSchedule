/*
start:  moment().toDate(),
end:    moment().add(1, "days").toDate(),
title:  "Felipe is testing Some title"
*/
const mongoose = require("mongoose")

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