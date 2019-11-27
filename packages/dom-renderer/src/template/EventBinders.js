let d = window.document

export const bind = (el, events, data, config) => {
    events.forEach(e => {
        el['on' + e.name] = (event) => e.handler(event, data, config)
    })
    return el
}

const mapElementToEvents = (type) => {
    return []
}