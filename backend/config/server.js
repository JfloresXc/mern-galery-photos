import express from 'express'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import route from '../routes/publications.routes'
import cors from 'cors'

class Server{
    constructor(){
        this.app = express()

        this.settings()
        this.midlewares()
        this.routes()
        this.statics()
    }

    settings(){
        this.app.set("port", process.env.PORT)
    }

    midlewares(){
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(fileupload())
    }

    routes(){
        this.app.use( '/api/publications', route)
    }

    listen(){  
        this.app.listen(this.app.get('port'), () => console.log('Server on port ' + this.app.get('port')))
    }

    statics(){
        this.app.use('/public', express.static('storage'))
    }
}

module.exports = Server

