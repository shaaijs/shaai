const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const DB_URI = process.env.DB_URI || 'mongodb://localhost/shaai'
mongoose.connect(DB_URI, { useNewUrlParser: true });

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function (err) {
    if (err) throw err;
    require('./models/user')
    require('./models/blog')
});

