let feedAttrs = [
    {
        name: 'title',
        feedKey: 'title'
    }, {
        name: 'link',
        feedKey: 'link'
    }, {
        name: '_id',
        feedKey: 'guid'
    }, {
        name: 'author',
        feedKey: 'dc:creator'
    }, {
        name: 'publishData',
        feedKey: 'pubDate'
    }, {
        name: 'subtitle',
        feedKey: 'content:encoded'
    }, {
        name: 'content',
        feedKey: 'content:encoded'
    }
]

const getItems = rssFeed => {
    const itemExtractor = (feedItem, feedKey) => {
        return feedItem
            .match(new RegExp(`(<${feedKey}[^>]*>(.|\n)*?<\/${feedKey}>)`, 'gm'))[0]
            .replace(new RegExp(`(<${feedKey}[^>]*>|</${feedKey}>)`, 'gm'), '')
            .replace(new RegExp(`(<!\\[CDATA\\[|\\]\\]>)`, 'gm'), '')
    }

    let items = rssFeed.match(/<item>(.|\n)*?<\/item>/gm)
    return items.map(feedItem => {
        let obj = {}
        feedAttrs.map(item => {
            obj[item.name] = itemExtractor(feedItem, item.feedKey)
            if (item.name == 'subtitle') {
                obj[item.name] = obj[item.name].substr(0, 100)
            }
        })
        return obj;
    })
}

const parser = rssFeed => {
    let feed = {}
    feed.items = getItems(rssFeed)
    return feed
}

module.exports = parser