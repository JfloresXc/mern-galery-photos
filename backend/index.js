import Server from './config/server'
import dotenv from 'dotenv'

dotenv.config()
new Server().listen()

require('./config/database')

