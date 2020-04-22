/*
start:  moment().toDate(),
end:    moment().add(1, "days").toDate(),
title:  "Felipe is testing Some title"
*/
const mongoose = require("mongoose")

const AvailabilitySchema = new mongoose.Schema({
    availability: {
        type: [{
            day: {
                type: String,
                required: true
            },
            dayIndex: {
                type: Number,
                required: true
            },
            isAvailable: {
                type: Boolean,
                required: true
            },
            isAllDay: {
                type: Boolean,
                required: true
            },
            start: {
                hour: {
                    type: Number,
                    required: true
                },
                minute: {
                    type: Number,
                    required: true
                }
            },
            end: {
                hour: {
                    type: Number,
                    required: true
                },
                minute: {
                    type: Number,
                    required: true
                }
            },
            selection: {
                type: String,
                required: true
            }
        }]
    },
    startingFrom: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = Schedule = mongoose.model('availability', AvailabilitySchema)