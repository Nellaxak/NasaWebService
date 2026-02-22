import express from 'express';
import bodyParser from "body-parser";
const app = express()

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
async function CalcData(page) {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + page);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + page);
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  return new Promise((resolve) => {
    resolve(startDate)
  })
}
//let startDate:'string'
/*'/page/:page'*/
app.get('/page/:page', async (_req, res) => {
  console.log('render page', _req.params)
  const startDate = _req.params.page
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()
  console.log('count', data.element_count)
  res.send(data);
})
app.post('/', async (req, res) => {
  //console.log('Received data:', req.body); // Access the submitted data
  const startDate = await CalcData(Number(req.body.page))
  //page = Number(req.body.page)
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()
  // You can then save this data to a database, perform validation, etc.
  // Send a response back to the client
  res.status(200).send(data);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app

/*
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
*/