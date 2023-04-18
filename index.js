import mongoose from "mongoose";
import express from "express";
import * as dotenv from 'dotenv';
import kodersRouter from "./routers/koders.routers.js"

dotenv.config()

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, SERVER_PORT} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

//crear servidor
const server = express()

//middleware
server.use(express.json()) //convierte el request a un json (JSON.parse)

//routers
server.use('/koders', kodersRouter)

mongoose.connect(URL)
    .then( (connection) => {
        console.log('Database connected')

        server.listen(SERVER_PORT, () => {
            console.log(`Server listening on port ${SERVER_PORT}` )
        })



    })
    .catch( (error) => {
        console.log("Error: ", error)
    })