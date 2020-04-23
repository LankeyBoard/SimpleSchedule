const express = require('express')
const availabilityController = express.Router()
const Availability = require('./../models/Availability')
const { check, validationResult } = require("express-validator/check")

// @route       Post api/availability/create
// @desc        Creates an availability
// @access      Private
availabilityController.post('/create', [
    check('availability', 'availability is required').exists(),
    check('userId', 'userId is required').exists(),
    check('startingFrom', 'startingFrom is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body
    const { availability, userId, startingFrom } = req.body

    try {


        // AvailabilitySchema
        const _availabilityDocument = new Availability({
            availability,
            userId, 
            startingFrom
        })

        // wanted to use this but did not work...
        // await Availability.findOneAndUpdate({"userId": userId}, {upsertData},{upsert: true})

        // first we look for the document using the users objectId
        const existingDoc = await Availability.findOne({userId})
        if(!existingDoc) {
            await _availabilityDocument.save()
        } else {
            // await Availability.findOneAndUpdate({"userId": userId}, {upsertData},{upsert: true})
            await Availability.deleteOne({"userId": userId})
            await _availabilityDocument.save()
        }

        res.send({ isSuccess: true, availabilityDocument: _availabilityDocument })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Post api/availability/create
// @desc        Creates an availability
// @access      Private
availabilityController.post('/read', [
    check('userId', 'userId is required').exists(),
], async (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body

    try {

        const _availabilityDocument = await Availability.findOne({userId})
        res.send({ isSuccess: true, availabilityDocument: _availabilityDocument })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


module.exports = availabilityController