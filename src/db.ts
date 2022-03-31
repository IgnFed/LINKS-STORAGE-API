import { connect, disconnect } from 'mongoose'

const MONGO_DB_URI: string | undefined = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development')
                                          ? process.env.MONGO_URI_TEST : process.env.MONGO_URI
if (!MONGO_DB_URI) console.error('MongoDB URI is not defined as ENV variable')

connect(MONGO_DB_URI || '')
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err))

process.on('uncaughtException', err => {
  console.log(err)
  disconnect()
})