import express from 'express';
import { Koder } from '../models/koders.model.js'

const router = express.Router()

router.get('/',async (request, response) => {

    const allKoders = await Koder.find({})

    response.json({
        sucess: true,
         data: {
            koders: allKoders
         }
        })
})

router.post('/',async (request, response) => {
    const newKoder = {
        name: 'post test',
        lastName: 'Pacheco',
        age: '28',
        gender: 'h'
    }

    const koderCreated = await Koder.create(newKoder)

    response.json({
        sucess: true,
         data: {
            koders: koderCreated
         }
        })
})

router.patch('/', async (request, response) => {
    const newData = {
            name: 'update test'
        }

        const koderUpdated = await Koder.findByIdAndUpdate('643e1dfa4667c9806bc83abb', newData,{new:true})
        
        response.json({
            sucess: true,
             data: {
                koders: koderUpdated
             }
            })
})

router.delete('/', async (request, response) => {
     const koderDeleted = await Koder.findByIdAndDelete('643e1dd1c84c485c48f21086')
        
     response.json({
        sucess: true,
         data: {
            koders: koderDeleted
         }
        })
})

export default router