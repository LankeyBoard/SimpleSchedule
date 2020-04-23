const express = require('express')
const eventController = express.Router()
const Event = require('./../models/Event')
const EventUtil = require('./../models/EventUtil')
const UserUtil = require('./../models/UserUtil')
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
    check('description', 'description is required'),
    check('isTimeOff', 'isTimeOff is required').exists(),
    check('status', 'status is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body
    const { start, end, title, allDay, description, isTimeOff, status } = req.body

    try {

        newEvent = new Event({
            start: new Date(start), 
            end: new Date(end), 
            title, 
            allDay, 
            description,
            userObjectId: "",
            isTimeOff, 
            status
        })

        await newEvent.save()

        res.send({isSuccess: true, newEvent: newEvent.toObject()})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error,errorMsg: error.message})
    }
})


// @route       Get api/events/getAllEvents
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



// @route       Post api/events/createShiftRead
// @desc        Read all events (where events = unassiged + not Time Off)
// @access      Public
eventController.get('/createShiftRead', async (req, res) => {
    try {
        const events = await EventUtil.getAllUnassigedEvents()
        const users = await UserUtil.getAllUsers()
        res.send({ isSuccess: true, events, users })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})



// @route       Post api/events/assignShifts
// @desc        Read all events (where events = unassiged + not Time Off)
// @access      Public
eventController.post('/assignShifts', [
    check('events', 'events are required').exists(),
], async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })//bad request
        }

        // extracting these properties from the body...
        const { events } = req.body

        events.forEach(async (e) => {
            const filter = { _id: e._id };
            const update = { userObjectId: e.userObjectId }
            await Event.findOneAndUpdate(filter, update)
        })

        res.send({ 
            isSuccess: true, 
            events, 
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})



// @route       Post /api/events/timeOffRequest
// @desc        Used to make a request for timeOff
// @access      Public
eventController.post('/timeOffRequest', [
    check('start', 'start is required').exists(),
    check('end', 'end is required').exists(),
    check('title', "title is required").exists(),
    check('allDay', 'allDay is required').exists()
    // check('userObjectId', "userObjectId is required").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })//bad request
        }
        // extracting these properties from the body...
        const { start, end, title, allDay } = req.body
        const _event = new Event({
            title,
            start: new Date(start), 
            end: new Date(end), 
            allDay,
            userObjectId: "none",
            status: 'pending',
            description: 'time off request',
            isTimeOff: true
        })
        await _event.save()
        res.send({ isSuccess: true, eventDetails: _event })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Get /api/events/timeOffRequestRead
// @desc        Used to make a request for timeOff
// @access      Public
eventController.get('/timeOffRequestRead', async (req, res) => {
    try {
        const timeOffEvents = await Event.find({isTimeOff: true})
        res.send({ isSuccess: true, timeOffEvents })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Get /api/events/deleteEvent
// @desc        Used to make a request for timeOff
// @access      Public
eventController.post('/deleteEvent', [
    check('eventid', 'eventid is required').exists()
],async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })//bad request
        }
        // extracting these properties from the body...
        const { eventid } = req.body

        console.log(eventid)
        console.log(typeof eventid)

        // const filter = {_id: eventid}
        await Event.findByIdAndDelete(eventid)
        res.send({ isSuccess: true, documentId: eventid })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }    
})

module.exports = eventController