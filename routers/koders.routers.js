import express from 'express';
import { Koder } from '../models/koders.model.js'
import { CustomError } from '../errorCustom.js'

const router = express.Router()

router.use((request, response, next) => { // Middleware a nivel de router
    next()
})

const middlewareGetKoders = (request, response, next) => {
    next() //Middleware a nivel de endpoint
}

router.get('/', middlewareGetKoders, async (request, response) => {
    try {
        const allKoders = await Koder.find({})
        
        if(!allKoders)
        throw new CustomError("Koders not found", 404)
        
        response.json({
            success: true,
             data: {
                koders: allKoders
             }
            })

    } catch (error) {
        response
        .status(error.status)
        .json({
            success: false,
            message: error.message
        })
    }
})

router.post('/',async (request, response) => {
   
    try{
        
        const newKoder = request.body
    
        const koderCreated = await Koder.create(newKoder)

        response
        .status(201)
        .json({
            success: true,
             data: {
                koders: koderCreated
             }
            })
   
    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: error.message
        })
    }

})


router.patch('/koders/:id', async (request, response) => {
    
    try{
        
        const { id } = request.params
        const newData = request.body
    
        const koderUpdated = await Koder.findByIdAndUpdate(id, newData,{ new:true })

        response.json({
            success: true,
            data: {
                koders: koderUpdated
            }
        })

    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: error.message
        })
    } 
})

router.delete('/koders/:id', async (request, response) => {
    
    try {
        const { id } = request.params
    
        const koderDeleted = await Koder.findByIdAndDelete(id)
            
         response.json({
            success: true,
             data: {
                koders: koderDeleted
             }
        })

    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: error.message
        })
    } 
})


export default router