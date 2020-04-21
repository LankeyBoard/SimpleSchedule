const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Settings = require('./../settings')
const gravatar = require('gravatar')
const User = require('./../models/User')

class UserUtility
{

    // read operations...
    static async getUserByUserId(userid)
    {
        return await User.findOne({ userid })
    }

    static async getUserByEmail(email)
    {
        return await User.findOne({ email })
    }

    static async getAllUsers() {
        return await User.find({})
    }

    static async updateUser(user) {
        const { userid } = user
        const upsertData = user.toObject();
        return await User.findOneAndUpdate({"userid": userid}, {upsertData},{upsert: true})
    }



    static async passwordGen(user, plainPassword)
    {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(plainPassword, salt)
    }

    static getPayload(user) {
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                avatar: user.avatar,
                email: user.email,
                userid: user.userid,
                userName: `${user.firstName} ${user.lastName}`
            }
        }
        return payload
    }

    static signToken(payload, res)
    {
        jwt.sign(payload, Settings.secret, {expiresIn: Settings.tokenExpiry}, (error, token) => {
            if(error) {
                throw error
            }
            res.json(token)
        })
    }

    static getGravatar(email) {
        return gravatar.url(email, {
            s: '400',
            r: 'pg',
            d: 'mm'
        })
    }

}


module.exports = UserUtility