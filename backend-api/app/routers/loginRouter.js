const express = require('express');
const db = require('../utils/databaseConnection');
const { validateUser } = require('../managers/loginManager');

const loginRouter = express.Router()

loginRouter.get('/:type/auth/:username', (req, res) => {
    const { username, type } = req.params;
    const sql = `SELECT password_hash, id FROM user WHERE username = '${username}' AND type = '${type}'`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length === 1) {
            if (validateUser(req.body, result[0]))
                res.send({ message: 'Auth Success' });
        }
        else res.send({ message: 'Auth Failed' });
        console.debug('User query ended');
    });
})

module.exports = loginRouter;