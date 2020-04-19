const express = require('express')
const userController = express.Router()
const User = require('./../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { check, validationResult } = require("express-validator/check")
// @route       Post api/users/test
// @desc        Register User
// @access      Public
userController.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 4 or more characters').isLength({min: 4})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }
    const { name, email, password } = req.body
    try {
        // Checking if the user already
        let user = await User.findOne({ email })
        if(user) {
            res.status(400).json({ errors: [ {msg: "User already exists."} ] })
        }
        // grab gravitar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        console.log(avatar)

        // create the user object...
        user = new User({
            name,
            email,
            avatar,
            password// not encrypted
        })

        // encrypt password TODO...
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // saving user object to db.
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, "SECRET", {expiresIn: "10h"}, (error, token) => {
            if(error) {
                throw error
            }
            res.json({token})
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


module.exports = userController