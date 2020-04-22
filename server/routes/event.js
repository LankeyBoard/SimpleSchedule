const express = require('express')
const eventController = express.Router()
const Event = require('./../models/Event')
const EventUtil = require('./../models/EventUtil')
const { check, validationResult } = require("express-validator/check")

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

// @route       Post api/events/create
// @desc        Creates an event
// @access      Public
eventController.post('/create', [
    check('start', 'start is required').exists(),
    check('end', 'end is required').exists(),
    check('title', "title is required").exists(),
    check('allDay', 'allDay is required').exists(),
    check('description', 'description is required').exists(),
    check('userObjectId', "userObjectId is required").exists(),
    check('isTimeOff', 'isTimeOff is required').exists(),
    check('status', 'status is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body
    const { start, end, title, allDay, description, userObjectId, isTimeOff, status } = req.body

    try {

        newEvent = new Event({
            start: new Date(start), 
            end: new Date(end), 
            title, 
            allDay, 
            description, 
            userObjectId, 
            isTimeOff, 
            status
        })

        await newEvent.save()

        res.send({isSuccess: true, newEvent: newEvent.toObject()})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Post api/events/getAllEvents
// @desc        Read all events
// @access      Public
eventController.get('/getAllEvents', async (req, res) => {
    try {
        const events = await EventUtil.getAll()
        res.send({ isSuccess: true, events })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


module.exports = eventController