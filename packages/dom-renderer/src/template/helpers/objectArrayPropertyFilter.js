import _ from 'lodash'
export default (array, filter) => {
    return array.map(a => {
        return _.pickBy(a, (v, k) => {
            return filter.indexOf(k) > -1
        })
    })
}