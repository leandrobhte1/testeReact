const restful = require('node-restful');
const mongoose = restful.mongoose;

const languagesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: {type: String, required: true}
});

module.exports = restful.model('Languages', languagesSchema);