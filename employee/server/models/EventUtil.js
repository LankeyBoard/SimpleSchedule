// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Settings = require('./../settings')
// const gravatar = require('gravatar')
const Event = require('./../models/Event')

class EventUtility
{
    static async getAll() {
        return await Event.find({})
    }

    static async Save(start, end, title, allDay) {
        const _event = new Event({
            start, 
            end,
            title, 
            allDay
        })
        await _event.save()
    }



}


module.exports = EventUtility