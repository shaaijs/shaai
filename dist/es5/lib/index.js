'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var configurator = require('./config').setup;

var getters = require('./src/getters');

var Shaai = function () {
    function Shaai(options) {
        _classCallCheck(this, Shaai);

        this.config(options);
    }

    _createClass(Shaai, [{
        key: 'config',
        value: function config(options) {
            if (!options) return;
            configurator(options);
            this.instantiate();
        }
    }, {
        key: 'instantiate',
        value: function instantiate() {
            this.getBlogs = getters.getBlogs;
            this.getLatestBlogs = getters.getLatestBlogs;
            this.getLatestBlog = getters.getLatestBlog;
        }
    }]);

    return Shaai;
}();

var _instance = null;
module.exports = function (options) {
    return _instance || (_instance = new Shaai(options));
};