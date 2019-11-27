const Blog = require('./../db/models/blog')
const User = require('./../db/models/user')
const urlGenerator = require('./../utils/urlGenerator')

module.exports = {
    getAll: async (blogCode, limit) => {
        const user = await User.findOne({ blogCode })
        if (!user) return { success: false }
        return await Blog.find({ userId: user._id }, { userId: 0 }).limit(limit).sort({ modified: -1 })
    },
    get: async (blogId) => {
        return await Blog.findById(blogId).then(async blog => {
            if (blog) {
                let user = await User.findById(blog.userId)
                let { userId, ...rest } = blog._doc
                return { ...rest, user }
            } else return { success: false }
        })
    },
    create: async (userToken, blog) => {
        const user = await User.findOne({ userToken })
        if (!user) return { success: false }
        blog['userId'] = user._id
        const b = await Blog.create(blog)
        const url = urlGenerator(b._id, b._doc.title)
        const updatedBlog = await Blog.findByIdAndUpdate(b._id, { publicUrl: url }, { new: true })
        return { success: true, ...updatedBlog }
    },
    edit: async (userToken, blogId, blog) => {
        const user = await User.findOne({ userToken })
        if (!user) return { success: false }
        const b = await Blog.findByIdAndUpdate(blogId, blog)
        return { success: true, ...b._doc }
    },
    remove: async (blogId) => {
        return await Blog.findByIdAndRemove(blogId).then(async (blog) => {
            if (!blog) return { success: false }
            return await User.findById(blog.userId)
        })
    }
}