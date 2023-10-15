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

venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client: venom.Whatsapp) {
  client.onMessage((message: { body: string; isGroupMsg: boolean; from: any; }) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result: any) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro: any) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
app.listen(port, () => {
  console.log(`⚡️[${port}]: Server is running at http://localhost:${port}`)
})