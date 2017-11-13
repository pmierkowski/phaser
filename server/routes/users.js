const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const dbPath = path.resolve(__dirname) + '/../database/game.db';

/**
 * Add new users score
 */
router.post('/', function (req, res, next) {
    let name = req.body.name;
    let score = req.body.score;

    if (undefined === name || undefined === score) {
        res.json({'status': 'Invalid arguments'});
        return;
    }

    let sql = `
        INSERT INTO users (name, score) 
        VALUES(
            ?, ?  
        );
    `;

    let db = new sqlite3.Database(dbPath);
    db.run(sql, [name, score], (err, row) => {
        res.json({'status': true});
    });
    db.close();
});

/**
 * get top users
 */
router.get('/', function (req, res, next) {
    let sql = `
        SELECT * FROM users
        ORDER BY score ASC
        LIMIT 10;
    `;

    let db = new sqlite3.Database(dbPath);
    db.all(sql, (err, row) => {
        res.json(row);
    });
    db.close();
});

/**
 * get user by id
 */
router.get('/:id', function (req, res, next) {
    let userId = req.params.id;
    let sql = `SELECT * FROM users WHERE id = ?;`;

    let db = new sqlite3.Database(dbPath);
    db.get(sql, [userId], (err, row) => {
        if (undefined !== row) {
            res.json(row);
        }
        else {
            res.json({});
        }
    });
    db.close();
});

module.exports = router;
