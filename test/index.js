const shaai = require('./../lib')

const s = shaai({
    source: {
        name: 'FS',
        config: {
            contentPath: '/test/content'
        }
    }
})

s.getBlogs().then(blogs => {
    console.log(blogs)
}).catch(err => {
    console.log(err)
})