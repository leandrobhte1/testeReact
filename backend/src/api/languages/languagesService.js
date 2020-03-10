const Languages = require('./languages');

Languages.methods(['get', 'post','put','delete']);
Languages.updateOptions({new: true, runValidators: true});

module.exports = Languages;