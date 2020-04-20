/*
start:  moment().toDate(),
end:    moment().add(1, "days").toDate(),
title:  "Felipe is testing Some title"
*/
const mongoose = require("mongoose")

const ScheduleSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    allDay: {
        type: Boolean,
        required: true
    }
})

module.exports = Schedule = mongoose.model('event', ScheduleSchema)