const express = require('express')
const eventController = express.Router()
//const User = require('./../models/User')
const EventUtil = require('./../models/EventUtil')
const { check, validationResult } = require("express-validator/check")


// @route       Post api/event/create
// @desc        Creates an event
// @access      Public
eventController.post('/create', [
    check('start', 'start is required').exists(),
    check('end', 'end is required').exists(),
    check('title', "title is required").exists(),
    check('allDay', 'allDay is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body
    const { start, end, title, allDay } = req.body

    try {
        const today = new Date()// stubbing...
        await EventUtil.Save(today, today, title, allDay)
        res.send({eventResponse: "event has been created"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Post api/event/getAllEvents
// @desc        Read all events
// @access      Public
eventController.get('/getAllEvents', async (req, res) => {
    try {
        const events = await EventUtil.getAll()
        res.send({ events })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


module.exports = eventController