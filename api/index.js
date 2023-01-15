const express = require('express')
const app = express()
const port = 3001

app.get('/foo', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})