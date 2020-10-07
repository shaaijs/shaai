module.exports = (id, text) => {
    if(!text) return id
    let clean = text.slice(0, 100).split(' ').slice(0, 6).map(i => i.replace(/\W/g, '').toLowerCase()).join('-')
    return `${clean}-${id}`
}