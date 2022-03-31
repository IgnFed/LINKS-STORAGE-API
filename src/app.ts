import express, { Express, Response } from 'express'
import cors from 'cors'
import { IRoutes } from './interfaces/app'
import userRouter from './routes/user'
import noteRouter from './routes/link'
import errorHandler from './middlewares/error'
import { loginRouter } from './routes/login'

export class App {
  app: Express
  routes: IRoutes

  constructor() {
    this.app = express()
    this.routes = {
      api: {
        user: '/api/user/',
        link: '/api/link/',
        login: '/api/login/',
      }
    } as IRoutes

    this.middlewares()
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    if (process.env.NODE_ENV === 'development') {
      (async () => {
        const { default: morgan } = await import('morgan')
        this.app.use(morgan('dev'))
      })()
    }
    this.app.get('/api', (_, res: Response) => {
      console.log('hola')
      return res.status(200).send('Hello World from /API/')
    })
    this.app.use(this.routes.api.user, userRouter)
    this.app.use(this.routes.api.link, noteRouter)
    this.app.use(this.routes.api.login, loginRouter)
    this.app.use(errorHandler)
  }

  listen(port?: string) {
    port = port || process.env.PORT || '3001'
    this.app.listen(
      port,
      () => {
        console.log(`Server is running on port < http://localhost:${port || process.env.PORT || '3001'}/api >`)
      })
  }
}