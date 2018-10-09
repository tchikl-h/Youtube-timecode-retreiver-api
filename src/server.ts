import express = require('express');
import * as path from 'path';
import * as request from 'request';
import Controller from './Controller';

const port = process.env.PORT || 5000;
const app = express();
let access_token = '';
let refresh_token = '';

/**
 * example http://youtube-timecode-retriever-api/api/v1/channelName/PewDiePie?quote=Look at T-Series, they're just crying for their momma
 */
app.get('/api/v1/channelName/:channelName', (req, res) => {
    let controller = new Controller(req.headers.access_token);
    controller.getVideoFromChannel(req.params.channelName, req.query.quote)
    .then(response => {
        res.send(response);
    })
    .catch(e => console.log(e))
})

/**
 * example http://youtube-timecode-retriever-api/api/v1/search?keywords=pewdiepie;tseries;clash;lasagna&quote=Look at T-Series, they're just crying for their momma
 */
app.get('/api/v1/search', (req, res) => {
    let controller = new Controller(req.headers.access_token);
    controller.getVideoFromKeywords(req.query.keywords.split(';'), req.query.quote)
    .then(response => {
        res.send(response);
    })
    .catch(e => console.log(e))
})

app.get('/', (req, res) => {
    res.send("Welcome to the API of Youtube-Timecode-Retriver !")
})

app.listen(port);