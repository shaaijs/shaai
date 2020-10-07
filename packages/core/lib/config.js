const setup = options => {
    global.shaaiEnv = { env: options }
}

const env = () => {
    return global.shaaiEnv.env
}

module.exports = { setup, env }