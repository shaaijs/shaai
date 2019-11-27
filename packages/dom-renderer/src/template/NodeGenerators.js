import { bind } from './EventBinders'
import keyToElement from './helpers/keyToElementMap'
import history from './history'
import store from './store'

let d = window.document
export const list = (data, options = { minimiseContent: true }) => {
    if(!data) throw Error(`Data needs to be an Array. Got ${data}.`)
    let list_root = d.createElement('div')
    list_root.className = 'blog-list'
    for(let i = 0; i < data.length; i++) {
        let current = data[i]
        let currentElement = fillListElement(d.createElement('div'), current, options)
        list_root.appendChild(currentElement)
    }
    return list_root
}

export const one = (data, options = { minimiseContent: false }) => {
    return list(data, options)
}

export const fillListElement = (el, data, { minimiseContent = true, viewFilter }) => {
    let element = {}
    let dataKeys = viewFilter && viewFilter.length ? Object.keys(data).filter(k => viewFilter.indexOf(k) > -1).sort((a, b) => {
        return viewFilter.indexOf(a) - viewFilter.indexOf(b)
    }) : Object.keys(data)
    dataKeys.forEach(key => {
        if(!data[key]) return
        let elementConfig = keyToElement(key)
        element[key] = d.createElement(elementConfig.tag)
        switch(key) {
            case 'image':
            case 'coverImage':
                element[key].src = data[key]
            case 'content':
                element[key].innerHTML = minimiseContent ? data[key].slice(0, 100) : data[key]
                break
            default:
                element[key].textContent = elementConfig.transform ? elementConfig.transform(data[key]) : data[key]
        }

        elementConfig.events && elementConfig.events.length && (element[key] = bind(element[key], elementConfig.events, data))
        element[key].className = elementConfig.className
        el.appendChild(element[key])
    })

    el.className = 'post'
    return el
}

export const blogHeader = (data) => {
    let headerRoot = d.createElement('div')
    headerRoot.id = 'blogHeader'
    let header
    if(data.title) {
        header = d.createElement('h1')
        header.className = 'blog-header-title'
        header.textContent = data.title
    } else if(data instanceof HTMLElement) {
        header = data
    } else {
        header = d.createElement('h1')
        header.className = 'blog-header-title'
        header.textContent = 'My blog'
    }

    headerRoot.appendChild(header)

    return headerRoot
}

export const blogFooter = (data) => {
    let footerRoot = d.createElement('div')
    footerRoot.id = 'blogFooter'
    let footer
    if(data.title) {
        footer = d.createElement('h1')
        footer.className = 'blog-footer-title'
        footer.textContent = data.title
    } else if(data instanceof HTMLElement) {
        footer = data
    } else {
        footer = d.createElement('h1')
        footer.className = 'blog-footer-title'
        footer.textContent = 'My blog'
    }

    footerRoot.appendChild(footer)

    return footerRoot
}

export const navMenu = (data) => {
    let menu = d.createElement('ul')
    menu.className = 'blog-navmenulist'
    data.forEach(item => {
        let menuItem = d.createElement('li')
        menuItem.className = `blog-navmenuitem ${store.getData('currentPath') === item.path ? 'blog-navmenuitem-active' : ''}`
        menuItem.textContent = item.name
        menuItem = bind(menuItem, [{
            name: 'click',
            handler: item.handler ? (e) => item.handler(e, item) : (e) => {
                history().push(item.path)
            }
        }], item)
        menu.appendChild(menuItem)
    })

    let menu_root = d.createElement('div')
    menu_root.id = 'blogNavmenu'
    menu_root.className = 'blog-navmenu'
    menu_root.appendChild(menu)
    
    return menu_root
}