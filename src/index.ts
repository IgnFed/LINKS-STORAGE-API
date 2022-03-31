import dotenv from 'dotenv'
dotenv.config()
require('./db')
import { App } from './app'
const app = new App()
app.listen()