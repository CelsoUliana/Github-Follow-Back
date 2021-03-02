import express from 'express'
import { FollowerJob } from './Jobs/FollowerJob'

let job = new FollowerJob()
let server = express()

server.on('close', () => {
    server.removeAllListeners()
})

server.listen(process.env.port, () => {
    console.log('Service is running port ' + process.env.port)
    job.followBack()
})
