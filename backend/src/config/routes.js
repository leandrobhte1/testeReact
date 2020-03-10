const express = require('express');

module.exports = function(server){
    // API Routes
    const router = express.Router();
    server.use('/api',router);

    // TODO Routes
    const todoService = require('../api/todo/todoService');
    todoService.register(router,'/todos');

    // LANGUAGES Routes
    const languagesService = require('../api/languages/languagesService');
    languagesService.register(router,'/languages');
}