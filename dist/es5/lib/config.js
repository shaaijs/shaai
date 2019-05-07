"use strict";

var setup = function setup(options) {
    global.shaaiEnv = { env: options };
};

var env = function env() {
    return global.shaaiEnv.env;
};

module.exports = { setup: setup, env: env };