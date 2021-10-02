import dotenv from 'dotenv';
import Server from './dist/models/server';
dotenv.config();


const server = new Server()

server.listen()