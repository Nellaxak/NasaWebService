var express = require('express');
import express from 'express';
//var serveStatic = require('serve-static');
//var cors = require('cors');
import cors from 'cors';

const app = express();
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Content-Type'
  );
  //console.log('zaxq', req.path)
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
var port = 3456;
var hostname = '127.0.0.1';
//let controller = new AbortController();
const expressServer = app.listen(port, hostname, async () => {
  console.log('listen', port);
});
const io = new Server(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
})
async function CalcData() {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate())// + this.count);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + this.count);
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  let endDate = tomorrow.getFullYear() + '-' +
    (tomorrow.getMonth() + 1) + '-' +
    tomorrow.getDate();
  //console.log('return data', startDate, endDate)
  return new Promise((resolve) => {
    resolve([startDate, endDate])
  })
  //return { startDate, endDate }
}
//console.log('ws server add page')
let startDate
let endDate
[startDate, endDate] = await CalcData()
//console.log('dates fetch', startDate, endDate)
try {
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  //const data = await resp.json()
  console.log('resp status', resp.status)
} catch (err) {
  console.log('err fetch', err)
}
var corsOptions = {
  origin: '*',
};
app.use(
  express.json({ type: ['application/json', 'text/plain'] }),
  cors(corsOptions)
);
