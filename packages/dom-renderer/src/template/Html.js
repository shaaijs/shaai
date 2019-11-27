class Html {
    constructor() {
        this.subscribers = []
    }

    set(html) {
        this.currentHtml = html
        let temp = document.createElement('div')
        temp.appendChild(this.currentHtml)
        this.subscribers.forEach(s => s(html, temp.innerHTML))
    }

    get() {
        return this.currentHtml
    }

    subscribe(cb) {
        this.subscribers.push(cb)
    }
}

let html

export default (() => {
    if(html) return html
    else {
        html = new Html()
        return html
    }
})()