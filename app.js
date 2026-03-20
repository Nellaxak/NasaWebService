import express from 'express';
import bodyParser from "body-parser";
//import Stream from 'stream';
/*import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';*/

const app = express()

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
let count = 0
let statusMap = new Map()
let differenceSet = new Set()
app.get('/page/:page', async (_req, res) => {
  console.log('render page', _req.params)
  const startDate = _req.params.page
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()
  //const data = await StreamReader(resp)
  /*const list = data.near_earth_objects
  //const dates = Object.keys(list)
  const arrObjects = Object.values(list)*/
  //readable stream+writable
  /*const dhhh = arrObjects[0].map(
    (item) => {
      //console.log('item', item)
      item.status = 0
      return item
    }
  );*/
  console.log('count', data.element_count, resp.status)
  res.send(data)//, statusMap]);
})
app.get('/api/id/:id', async (_req, res) => {
  const { id } = _req.params
  res.status(200).json({
    message: 'status updated successfully1',
    data: statusMap.get(id)
  });
})
app.post('/api/id/:id', async (_req, res) => {
  //const userData = _req.body;
  console.log('post req')
  const { id } = _req.params
  //console.log('Received user data:', id);
  const oldStatus = statusMap.get(id)
  //console.log('oldStatus', oldStatus)
  if (oldStatus === true || oldStatus === undefined) {
    statusMap.set(id, false)
    count = count - 1
    differenceSet.delete(id)
    //console.log('count', count)
  } else {
    statusMap.set(id, true)
    count = count + 1
    differenceSet.add(id)
  };
  console.log('statusMap', statusMap)
  res.status(200).json({
    message: 'status updated successfully',
    data: statusMap.get(id)
  });
});
app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app

/*
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
*/