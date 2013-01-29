var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var schema = mongoose.Schema({ name: 'string', age:'number',colors:'array' });

var Cat = mongoose.model('Cat', schema);

// why does this use module.exports instead of exports? 
// http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs
module.exports = Cat;