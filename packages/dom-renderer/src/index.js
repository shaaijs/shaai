import template from './template'
import defaultTemplates from './template/defaultTemplates'
import { list, one } from './template/NodeGenerators'
import Html from './template/Html'
import styles from './style.css'

console.log('Hello, Shaai!')

class ScrollInk {
    constructor(config) {
        this.config = config
        this.defaultTemplates = defaultTemplates
        let meta = document.createElement('meta')
        meta.content = 'width=device-width, initial-scale=1'
        meta.name = 'viewport'
        document.head.appendChild(meta)
    }

    load(templates) {
        if(!templates) templates = defaultTemplates       
        template(templates, this.config)
    }

    subscribe(cb) {
        Html.subscribe(cb)
    }

    list(data, options) {
        return list(data, options)
    }

    one(data, options) {
        return one(data, options)
    }
}

export default ScrollInk