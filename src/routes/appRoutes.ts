import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createUserController } from '../controller/user/createUserController'
import { getAllUsersController } from '../controller/user/getAllUserController'

const app: Express = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/createUser', createUserController)
app.get('/allUsers', getAllUsersController);

// app.get('/usuariosC/:id', getUserSC)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 1.0')
})

export const appRoutes = app