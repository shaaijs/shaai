const getItems = rssFeed => {
    let feedAttrs = ['title', 'link', 'guid', 'dc:creator', 'pubDate', 'content:encoded']

    const itemExtractor = (feedItem, tagName) => {
        return feedItem
            .match(new RegExp(`(<${tagName}[^>]*>(.|\n)*?<\/${tagName}>)`, 'gm'))[0]
            .replace(new RegExp(`(<${tagName}[^>]*>|</${tagName}>)`, 'gm'), '')
            .replace(new RegExp(`(<!\\[CDATA\\[|\\]\\]>)`, 'gm'), '')
    }

    let items = rssFeed.match(/<item>(.|\n)*?<\/item>/gm)
    return items.map(feedItem => {
        let obj = {}
        feedAttrs.map(item => obj[item] = itemExtractor(feedItem, item))
        return obj;
    })
}

const parser = rssFeed => {
    let feed = {}
    feed.items = getItems(rssFeed)
    return feed
}

module.exports = parser