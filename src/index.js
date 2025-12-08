const express = require('express')
const app = express()
const port = 6000

app.post('/demo', (req, res) => {
  console.log('Received a POST request at /demo')
  res.send({
    code: "0000",
    message: "success"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})