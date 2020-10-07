let store

class Store {
    constructor(initial) {
        if(!initial || typeof initial === 'object')
            this.store = initial || {}
        else throw Error(`Store can only be initialised with an object, instead found ${typeof initial}.`)
    }

    setData(data) {
        this.store = { ...this.store, ...data }
    }

    getData(key) {
        return key ? this.store[key] : this.store
    }

    clearStore() {
        this.store = {}
    }
}

export default (() => {
    if(store) return store
    else {
        store = new Store()
        return store
    }
})()