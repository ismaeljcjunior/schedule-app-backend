import express, { Express } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import venom from 'venom-bot';
import { appRoutes } from './routes/appRoutes'
dotenv.config()
import './services/queryNotify/queryNotify';

const app: Express = express()
const port = process.env.PORTDEV

app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));
app.use(express.json())
// app.use('/', appRoutes)
app.use(cors())

app.listen(port, () => {
  console.log(`⚡️[${port}]: Server is running at http://localhost:${port}`)
})