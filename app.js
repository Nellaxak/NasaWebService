import express from 'express';

const app = express()
const port = process.env.PORT || 3000;
async function CalcData() {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate())// + this.count);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate())// + this.count);
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  return new Promise((resolve) => {
    resolve(startDate)
  })
  //return { startDate, endDate }
}
//let startDate:'string'
const startDate = await CalcData()
console.log(startDate)
app.get('/', async (_req, res) => {
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const data = await resp.json()
  res.send(data);
})
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