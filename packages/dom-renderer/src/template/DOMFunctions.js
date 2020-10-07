let d = window.document

export const appendToRoot = (nodes, rootId) => {
    let rootDiv = createRoot(rootId)
    nodes.forEach(node => {
        rootDiv.appendChild(node)
    })

    return rootDiv
}

export const flushRoot = (root, skipThese, rootId) => {
    let temp = []
    while (root.firstChild) {
        if(skipThese && skipThese.indexOf(root.firstChild.id) > -1)
            temp.push(root.removeChild(root.firstChild))
        else root.removeChild(root.firstChild);
    }

    temp.forEach(t => root.appendChild(t))

    return root
}

const createRoot = (id) => {
    let root = d.createElement('div')
    root.id = id
    root.className = 'blog-root'
    return root
}