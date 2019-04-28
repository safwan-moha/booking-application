const express = require('express');
const db = require('../utils/databaseConnection');

const sellerRouter = express.Router()

sellerRouter.get('/', (req, res) => {
    const sql = `SELECT username, rating, location, response_time, user.id as uid FROM user, seller WHERE user.id = seller.user_id AND type = 'SELLER'`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
        console.log("Seller list sent");
    });
})

sellerRouter.get('/appointments', (req, res) => {
    const sql = `SELECT time_booking, date_booking, (SELECT username from user where id = buyer_id) as buyer FROM appointment`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
        console.log("appointment list sent");
    });
})

module.exports = sellerRouter;