import express from 'express';

const app = express()
async function CalcData() {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate())// + this.count);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate())// + this.count);
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  /*let endDate = tomorrow.getFullYear() + '-' +
    (tomorrow.getMonth() + 1) + '-' +
    tomorrow.getDate();*/
  //console.log('return data', startDate, endDate)
  return new Promise((resolve) => {
    resolve(startDate)
  })
  //return { startDate, endDate }
}
//let startDate:'string'
//let endDate:'string'
const startDate = await CalcData()
console.log(startDate)
//app.get('/', async (_req, res) => {
  console.log('lllll')
  //res.send('Hello Express!')
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  //const data = await resp.json()
  console.log('resp status', resp.status)
//  res.send(data);
//})

/*app.get('/api/users/:id', (_req, res) => {
  res.json({ id: _req.params.id })
})

app.get('/api/posts/:postId/comments/:commentId', (_req, res) => {
  res.json({ postId: _req.params.postId, commentId: _req.params.commentId })
})*/

export default app
