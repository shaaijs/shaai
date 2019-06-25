const _ = require('lodash')
const environment = require('./../../config').env
const markdown = require('markdown').markdown
const fs = require('fs')

module.exports = {
    get(from, size) {
        const rootPath = __dirname.split('/lib/resources/fs')[0]
        const contentPath = _.get(environment(), 'source.config.contentPath')
        if(!contentPath) reject('Could not read content directory.')
        if(contentPath[0] !== '/') contentPath = '/' + contentPath
        return new Promise((resolve, reject) => {
            let blogs = []
            fs.readdir(rootPath + contentPath, async (err, files) => {
                if(err) reject('Could not read content directory.')
                for(let i = 0; i < files.length; i++) {
                    let f = files[i]
                    blogs.push(await new Promise(res => fs.readFile(rootPath + contentPath + '/' + f, 'utf-8', (err, content) => {
                        if(err) reject('Could not read file.', err)
                        let blog = {}
                        blog.title = f.split('.')[0]
                        blog.content = f.split('.')[1] === 'md' ? markdown.toHTML(content) : content
                        res(blog)
                    })))
                }
                resolve(blogs)
            })
        })
    }
}