'use strict';

var getItems = function getItems(rssFeed) {
    var feedAttrs = ['title', 'link', 'guid', 'dc:creator', 'pubDate', 'content:encoded'];

    var itemExtractor = function itemExtractor(feedItem, tagName) {
        return feedItem.match(new RegExp('(<' + tagName + '[^>]*>(.|\n)*?</' + tagName + '>)', 'gm'))[0].replace(new RegExp('(<' + tagName + '[^>]*>|</' + tagName + '>)', 'gm'), '').replace(new RegExp('(<!\\[CDATA\\[|\\]\\]>)', 'gm'), '');
    };

    var items = rssFeed.match(/<item>(.|\n)*?<\/item>/gm);
    return items.map(function (feedItem) {
        var obj = {};
        feedAttrs.map(function (item) {
            return obj[item] = itemExtractor(feedItem, item);
        });
        return obj;
    });
};

var parser = function parser(rssFeed) {
    var feed = {};
    feed.items = getItems(rssFeed);
    return feed;
};

module.exports = parser;