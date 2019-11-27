import { list, one } from './NodeGenerators'
export default [
    {
        path: '/',
        name: 'Posts',
        template: ({ data }) => list(data, { minimiseContent: true, viewFilter: ['title', 'modified', 'subtitle'] }),
        fetch: (shaai, store, params) => {
            return new Promise(res => {
                if(store.getData('posts')) {
                    res(store.getData('posts'))
                }
                shaai.getBlogs().then(data => {
                    store.setData({ posts: data.items })
                    res(data.items)
                })
            })
        }
    },
    {
        path: '/post/:id',
        name: 'Single Post',
        template: ({ data }) => one(data, { minimiseContent: false, viewFilter: ['title', 'coverImage', 'content', 'publishData'] }),
        fetch: (shaai, store, params) => {
            let id = params[1].split('-')[params[1].split('-').length - 1]
            if(store.getData('posts')) {
                return new Promise(res => res(store.getData('posts').filter(p => p._id === id)))
            } else return new Promise(res => shaai.getBlogs().then(data => res(data.items.filter(p => p._id === id))))
        }
    },
    {
        path: '/about',
        name: 'About',
        template: ({ config }) => {
            let configAbout = config.about
            let html = configAbout ? (typeof configAbout === 'string' ? configAbout : `
                <div>
                    <h4 class="about-heading">${configAbout.title}</h4>
                    <p class="about-image">${configAbout.image}</p>
                    <p class="about-content">${configAbout.content}</p>
                </div>
            `) : `
                <div>
                    <h4 class="about-heading">About you</h4>
                    <p class="about-content">Write something about yourslef here!</p>
                </div>
            `
            let about = document.createElement('div')
            about.className = 'about'
            about.innerHTML = html

            return about
        }
    }
]