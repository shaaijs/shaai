const User = require('./../db/models/user')

module.exports = {
    getAll: async (limit) => {
        return await User.find().limit(limit)
    },
    login: async (user) => {
        return await User.findOne(user)
    },
    signUp: async (user) => {
        user['blogCode'] = Math.random().toString(36).substr(2) + Date.now();
        user['userToken'] = Math.random().toString(36).substr(2) + Date.now();
        return await User.create(user)
    },
    edit: async (userId, user) => {
        return await User.findByIdAndUpdate(userId, user)
    },
    remove: async (userId) => {
        return await User.findByIdAndRemove(userId)
    }
}