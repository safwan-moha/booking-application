const express = require('express');
const db = require('../utils/databaseConnection');

const buyerRouter = express.Router()

buyerRouter.post('/book', (req, res) => {
    const { buyer_id, seller_id, date, time } = req.body;
    const sql = `INSERT INTO appointment (buyer_id, seller_id, date_booking, time_booking) VALUES (${
        buyer_id}, ${seller_id}, '${date}', '${time}')`;
    console.log('SQL: ' + sql);
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({ message: "Success" }));
        console.log("Appointment added");
    });
})

module.exports = buyerRouter;