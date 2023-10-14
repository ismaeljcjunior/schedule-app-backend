import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.post('/usuarios', mainRoute)
// app.get('/usuarios/:id', getUsers)
// app.get('/usuariosC/:id', getUserSC)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 1.0')
})

export const appRoutes = app