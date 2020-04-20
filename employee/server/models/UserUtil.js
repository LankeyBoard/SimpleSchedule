const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Settings = require('./../settings')
const User = require('./../models/User')

module.exports = class UserUtility
{
    static async getUserByUserId(userid)
    {
        return await User.findOne({ userid })
    }

    static async getUserByEmail(email)
    {
        return User.findOne({ email })
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
                avatar: user.avatar
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
}