const express = require('express');
const app = express();
const port = 3000;
const line = require('@line/bot-sdk');
const serverless = require('serverless-http');
const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});
const to = process.env.MY_LINE_ID;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/line', (req, res) => {
    const content = `名前: ${req.body.name}\nアドレス: ${req.body.email}\nメッセージ: ${req.body.message}`;
    const message = {
        type: 'text',
        text: content
    }

    client.pushMessage(to, message)
        .then(() => {
            console.log('ok');
            res.send('ok');
        })
        .catch((err) => {
            console.error(err);
            res.send(500);
        })
    
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports.handler = serverless(app);