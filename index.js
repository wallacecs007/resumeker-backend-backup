const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv/config')
console.log(process.env.AUTH0_DOMAIN)

const userRouter = require('./endpoints/user-router.js')

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', userRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to Resumeker",
  })
})
  
  server.use((err, req, res, next) => {
    console.log("Error:", err)
  
    res.status(500).json({
      message: "Something went wrong",
    })
  })
  
  if (!module.parent){
    server.listen(port, () => {
      console.log(`\n** Running on http://localhost:${port} **\n`)
    })
  }
  
  module.exports = server;