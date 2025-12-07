const express = require('express')
const app = express()
const port = 3000

app.post('/demo', (req, res) => {
  const response = {
    code: "5000",
    message: "failure"
  }

  if (req.body.username != "") {
    response.code = "0000"
    response.message = "success"
  }
  res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})