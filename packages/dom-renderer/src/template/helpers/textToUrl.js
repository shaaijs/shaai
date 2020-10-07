export default (text) => {
    return text.split(' ').slice(0, 5).join(' ').match(/[a-zA-Z0-9]+/g).join('-').toLowerCase()
}