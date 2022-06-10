const { Router } = require('express');
const { getTypesDB } = require('../controllers/typesController');
const {Pokemon, Type} = require('../db')


const router = Router();

router.get('',async (req,res,next)=>{
    try {
        let out= await getTypesDB()
        res.status(200).send(out)
    } catch (error) {
       res.status(404).send(error)
    }
})

module.exports = router;