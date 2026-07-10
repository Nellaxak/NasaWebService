import express from 'express';
import bodyParser from "body-parser";
//import Stream from 'stream';
/*import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';*/

async function CalcData(params) {
    //console.log('CalcData', await params)
    //const count = await CountPage.getCount();
    let currentDate = new Date()
    /*let mskDate = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'short',
    timeStyle: 'medium'
}).format(new Date());*/
    const mskDate = new Date();
const options = {
  timeZone: 'Etc/GMT-3',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};
console.log(mskDate.toLocaleString('ru-RU', options)); 
    console.log('mskDate',mskDate)
    //mskDate.setDate(mskDate.getDate());
    currentDate.setDate(currentDate.getDate());
    const page = params
    //if (scroll === 'bottom') {
    // must be page>0
    //}
    //if (Number(page) > 0) {
    //const newPage = mskDate.getTime() + Number(page)*86400000
    //console.log('vnbnb',new Date(newPage).toLocaleString('ru-RU'))
    //mskDate.setDate(newPage);//+1
    const formatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',     
  day: '2-digit',
});
//let startDate =formatter.format(newPage)
//console.log('startDate',startDate); 
    const newPage = Number(currentDate.getDate()) + Number(page)
    currentDate.setDate(newPage);//+1
    //console.log('myDate', new Intl.DateTimeFormat('ru-RU', optionsDate).format(currentDate))
    /*const year=newPage/31600800000
    const month=newPage/
        let startDate = newPage.getFullYear() + '-' +
        (newPage.getMonth() + 1) + '-' +
        newPage.getDate();*/
    let startDate = currentDate.getFullYear() + '-' +
        (currentDate.getMonth() + 1) + '-' +
        currentDate.getDate();
    console.log('startDate',startDate)
    return startDate
}
const app = express()

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
let count = 0
let statusMap = new Map()
let differenceSet = new Set()
app.get('/page/:page', async (_req, res) => {
  console.log('render page', _req.params)
  const startDate = await CalcData(_req.params.page)
  //const startDate = _req.params.page
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()

  const prev = data.links.prev
  const respPrev = await fetch(prev)

  const next = data.links.next
  const self = data.links.self
  const respNext = await fetch(next)
  const respSelf = await fetch(self)
  const allArr=[]
 
  //console.log('dataPrev',dataPrev)
  const dataNext=await respNext.json()
  const dataSelf=await respSelf.json()

  //console.log('near_earth_objectsPrev',near_earth_objectsPrev)
  const near_earth_objectsNext=Object.values(dataNext.near_earth_objects)
  const near_earth_objectsSelf=Object.values(dataSelf.near_earth_objects)
      const dataPrev=await respPrev.json()
      console.log('page=0',_req.params.page,Object.keys(dataPrev.near_earth_objects))
    if (Number(_req.params.page)>0){
       
        console.log('page>0',_req.params.page,Object.keys(dataPrev.near_earth_objects))
        
        const near_earth_objectsPrev=Object.values(dataPrev.near_earth_objects)
  allArr.push(...near_earth_objectsPrev) 
    }
  allArr.push(...near_earth_objectsSelf)
  allArr.push(...near_earth_objectsNext)
  console.log('count', data.element_count, resp.status)
  res.send({data:allArr.flat())
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

//export default app

/*
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
*/
