const express = require('express')
const userController = express.Router()
const User = require('./../models/User')
const UserUtil = require('./../models/UserUtil')

const bcrypt = require('bcryptjs')

const { check, validationResult } = require("express-validator/check")
// @route       Post api/users
// @desc        Register User
// @access      Public
userController.post('/', [
    check('firstName', 'name is required').not().isEmpty(),
    check('lastName', 'name is required').not().isEmpty(),
    check('userid', "userid is required").exists(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 4 or more characters').isLength({min: 4}),
    check('role', 'please provide the desired role level').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }

    // extracting these properties from the body
    const { firstName, lastName, userid, email, password, role } = req.body

    try {

        let user = await UserUtil.getUserByEmail(email)

        if(user) {
            res.status(400).json({ errors: [ {msg: "User already exists."} ] })
        }

        // grabbing the users gravitar
        const avatar = UserUtil.getGravatar(email)

        // create the user object...
        user = new User({
            firstName, 
            lastName, 
            email,
            userid,
            avatar,
            role,
            password// is not yet encrypted
        })


        // encrypts the password
        await UserUtil.passwordGen(user, password)

        // saving user object to db.
        await user.save()
        UserUtil.signToken(UserUtil.getPayload(user), res)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


// @route       Post api/users/login
// @desc        authenticate user and gets a token
// @access      Public
userController.post('/authenticate', [
    check('userid', 'userid is a required field').not().isEmpty(),
    // check('email', 'please include a valid email').isEmail(),
    check('password', 'Password does NOT Exists').exists(),
    check('password', 'please enter a password with 4 or more characters').isLength({min: 4})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//bad request
    }
    const { userid, password } = req.body
    try {

        // getting the user from the database...
        let user = await UserUtil.getUserByUserId(userid)

        if(!user) {
            res.status(400).json({ errors: [ {msg: "User with this UserId does not exist."} ] })
        }

        const avatar = UserUtil.getGravatar(user.email)
        user.avatar = avatar
        await UserUtil.updateUser(user)

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            res.status(400).json({ errors: [ {msg: "Password is invalid."} ] })
        }

       UserUtil.signToken(UserUtil.getPayload(user), res)
        

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

// @route       Get api/users/getUsers
// @desc        authenticate user and gets a token
// @access      Public
userController.get('/getUsers',async (req, res) => {

    try {
        const allUsers = await UserUtil.getAllUsers()
        res.send({ users: allUsers })        
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }


})


module.exports = userController