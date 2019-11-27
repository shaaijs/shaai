import { createBrowserHistory } from 'history'
let instance
export default function(config) {
    if(instance) return instance
    let history = config.history || createBrowserHistory({
        basename: config.basePath || ''
    })

    instance = history
    return instance
}