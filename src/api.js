const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "fruit": "banana"
    });
});

router.get('/test', (req, res) => {
    res.json({
        "fruit": "mango"
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);