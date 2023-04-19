import express from 'express';
import { Koder } from '../models/koders.model.js'
import { CustomError } from '../errorCustom.js'

const router = express.Router()

router.get('/',async (request, response) => {
    try {
        const allKoders = await Koder.find({})
        
        if(!allKoders)
        throw new CustomError("Koders not found", 404)
        
        response.json({
            sucess: true,
             data: {
                koders: allKoders
             }
            })

    } catch (error) {
        response
        .status(error.status)
        .json({
            sucess: false,
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
            sucess: true,
             data: {
                koders: koderCreated
             }
            })
   
    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            sucess: false,
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
            sucess: true,
            data: {
                koders: koderUpdated
            }
        })

    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            sucess: false,
            message: error.message
        })
    } 
})

router.delete('/koders/:id', async (request, response) => {
    
    try {
        const { id } = request.params
    
        const koderDeleted = await Koder.findByIdAndDelete(id)
            
         response.json({
            sucess: true,
             data: {
                koders: koderDeleted
             }
        })

    } catch(error) {
        response
        .status(error.status || 400)
        .json({
            sucess: false,
            message: error.message
        })
    } 
})


export default router