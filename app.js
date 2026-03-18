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
let statusMap = new Map()
app.get('/page/:page', async (_req, res) => {
  console.log('render page', _req.params.page)
  const startDate = _req.params.page
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()
  /*const data = await StreamReader(resp)
  const list = data.near_earth_objects
  //const dates = Object.keys(list)
  const arrObjects = Object.values(list)
  await Promise.all(arrObjects[0].map(
    async (item) => { statusMap.set(item.id, false) }
  ));*/
  //const result = await db.records.bulkInsert(newList)
  console.log('count', data.element_count)
  res.send(data)//, statusMap]);
})
app.post('/api/:id', (_req, res) => {
  const userData = _req.body; 
  //change statusMap
  console.log('Received user data:', userData, _req.params);

  // In a real application, you would save this data to a database
  // and send an appropriate response.
  //fetch api.nasa.gov
  //res.send([data, statusMap]);
  res.status(200).json({
    message: 'User created successfully',
    data: userData
  });
});
app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  /*db = await createRxDatabase({
    name: 'exampledb',
    storage: getRxStorageMemory(),
    ignoreDuplicate: true,
    eventReduce: true,
  });*/
  /*recordShema = {
    title: 'records',
    type: 'array',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', maxLength: 100 },
      name: { type: 'string', maxLength: 100 },
      calc: { type: 'string', maxLength: 100 },
      links: { type: 'object' },
      absolute_magnitude_h: { type: 'number' },
      estimated_diameter: { type: 'object' },
      is_potentially_hazardous_asteroid: { type: 'boolean' },
      close_approach_data: { type: 'array' },
      is_sentry_object: { type: 'boolean' },
      sentry_data: { type: 'string', maxLength: 100 },
      dateReq: { type: 'string', maxLength: 100 },
      result_distance: { type: 'number' },
      danger: { type: 'number' },
      km_moon: { type: 'number' },
      idView: { type: 'string', maxLength: 100 },
      dateView: { type: 'string', maxLength: 100 },
      diameterView: { type: 'string', maxLength: 100 },
      dangerView: { type: 'string' },
      dateSort: { type: 'number' },
      statusItem: { type: 'number' },// 0<->1
    },
  }
  await db.addCollections({
    records: {
      schema: recordShema,
    },
  });*/
});

export default app

/*
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
*/