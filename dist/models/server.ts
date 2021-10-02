import express, {Application} from 'express'
import userRoutes from '../../routes/usuario';
import cors from "cors";
import db from '../../db/connection';


class Server {

    private app: Application 
    private port : string
    private path = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000'

        this.dbConnection()
        //middlewares
        this.middlewares()

        //definicipón de rutas
        this.routes()

    }

    async dbConnection(){
        try {
            
            await db.authenticate()
            console.log('Databse is Online')
        } catch (error) {
            console.log(error)
        }
    }

    middlewares(){ // funciiones que se ejecutan antes de las rutas u otros procedimientos
         //CORS
        this.app.use(cors())
         //Parsear el body 
        this.app.use(express.json())
         //carpeta publica
         this.app.use(express.static('public'))
    } 

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto !!!!' + this.port)
        })
    }

    routes(){
        this.app.use(this.path.usuarios, userRoutes)
    }
}

//export clase por defect

export default Server