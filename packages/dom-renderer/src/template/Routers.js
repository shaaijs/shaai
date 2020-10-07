import shaai from '@shaai/core'
import store from './store'
import pathToRegexp from 'path-to-regexp'
import Html from './Html'
import { appendToRoot, flushRoot } from './DOMFunctions'
import history from './history'
import { blogHeader, blogFooter, navMenu } from './NodeGenerators';
let router

class Router {
    constructor() {
        this.routes = {}
        this.registerRoutes = this.registerRoutes.bind(this)
        this.handleRoutes = this.handleRoutes.bind(this)
        this.resolveRoute = this.resolveRoute.bind(this)
    }

    registerRoutes(routes, config) {
        this.config = config
        this.shaai = shaai({
            source: config.source
        })
        this.history = history(config)
        routes.forEach(r => {
            if(/:/g.test(r.path)) {
                this.routes[r.path] = r
                this.routes[r.path].regex = pathToRegexp(r.path)
            } else {
                this.routes[r.path] = r
            }
        })
        this.history.listen((location) => {
            this.handleRoutes(this.config.history && this.config.basePath ? location.pathname.split(this.config.basePath)[1] : location.pathname)
        })
        this.handleRoutes(this.config.basePath ? window.location.pathname.split(this.config.basePath)[1] : window.location.pathname)
    }

    handleRoutes(path) {
        const url = path || '/'
        const { routeResolved, params } = this.resolveRoute(url)
        if(!routeResolved) return
        /*
            routeResolved has template, fetch
            Process:
            1. Fetch data and feed it to the template
            2. Create filled in DOM elements and return
        */
        store.setData({ currentPath: path })
        try {
            Html.get() && Html.set(flushRoot(Html.get(), [], this.config.root))
            if(routeResolved.fetch) {
                routeResolved.fetch(this.shaai, store, params).then(data => {
                    let elements = []
                    this.config.globalHeader === true && (routeResolved.showHeader === true || routeResolved.showHeader === undefined) && elements.push(blogHeader(this.config.blogHeader))
                    this.config.globalNav === true && (routeResolved.showNav === true || routeResolved.showNav === undefined) && elements.push(navMenu(Object.values(this.routes).filter(t => !/:/.test(t.path))))                    
                    elements.push(routeResolved.template({ data, config: this.config }))
                    this.config.globalFooter === true && (routeResolved.showFooter === true || routeResolved.showFooter === undefined) && elements.push(blogFooter(this.config.blogFooter))                    
                    Html.set(appendToRoot(elements, this.config.root))
                })
            } else {
                let elements = []
                this.config.globalHeader === true && (routeResolved.showHeader === true || routeResolved.showHeader === undefined) && elements.push(blogHeader(this.config.blogHeader))
                this.config.globalNav === true && (routeResolved.showNav === true || routeResolved.showNav === undefined) && elements.push(navMenu(Object.values(this.routes).filter(t => !/:/.test(t.path))))                    
                elements.push(routeResolved.template({ config: this.config }))
                this.config.globalFooter === true && (routeResolved.showFooter === true || routeResolved.showFooter === undefined) && elements.push(blogFooter(this.config.blogFooter))                    
                Html.set(appendToRoot(elements, this.config.root))
            }
        } catch(e) {
            throw new Error(`There was no fetch method defined for url '${url}'. fetch is necessary to push data into the template.`)
        }
    }

    resolveRoute(path) {
        try {
            if(this.routes[path]) return { routeResolved: this.routes[path] }
            else {
                let obj
                for(let i = 0; i < Object.keys(this.routes).length; i++) {
                    let r = Object.keys(this.routes)[i]
                    if(this.routes[r].regex) {
                        obj = { routeResolved: this.routes[r], params: this.routes[r].regex.exec(path) }
                        break
                    }
                }
                if(obj) return obj
            }
        } catch(e) {
            throw new Error('404. This route does not exist.')
        }
    }
}

export default (function(){
    if(router) return router
    else {
        router = new Router()
        return router
    }
})()