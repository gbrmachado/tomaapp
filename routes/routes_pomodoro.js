var express = require('express')
var router = express.Router()

module.exports = function(app, pomodoro) {
    router.get('/pomodoro/status', function(req, res) {
        if (!pomodoro) {
            res.status(403).json("False");
        } else {
            res.status(200).json(pomodoro);
        }
    });

    router.post('/pomodoro/create', function(req, res) {
        if (!pomodoro) {
            pomodoro = new Pomodoro(req.params.tags, req.params.description);
            res.status(200).json({code:200, message: 'Pomodoro created'})
        } else {
            res.status(403).json({message: 'The is an active pomodoro'})
        }
    });

    router.get('/pomodoro/stop', function(req, res) {
        if (!pomodoro) {
            res.status(403).json({message: 'There is no active pomodoro'})
        } else {
            pomodoro.stop();
            res.status(200).json({message: 'Pomodoro stoped'})
        }
    });

    return router;
}