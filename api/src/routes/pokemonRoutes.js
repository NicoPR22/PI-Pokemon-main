const { Router } = require('express');
const {createPokemon, getPokemonsByID, getAllPokemons, getPokemonByName} = require('../controllers/pokemonControllers');
const {Pokemon, Type} = require('../db')

const router = Router();

router.get('',async (req,res,next)=>{
    console.log(req.query.name)    
    try {
        if(req.query.name){
            const name= req.query.name   
            let out= await getPokemonByName(name)
            out?res.status(200).send(out):res.status(404).send({})   
        }else{
            let out=''
            out= await getAllPokemons() 
            res.status(200).send(out)   
        }
    } catch (error) {
        next(error)
    }
})



router.get('/:id', async (req,res,next)=>{
    try {
        const id= req.params.id
        let out= await getPokemonsByID(id)
        res.status(200).send(out)
    } catch (error) {
        next(error)
    }
})


router.post('',(req,res,next)=>{
    try {
        const {name,image,hp,defense,attack,speed,height,weight,types}= req.body
        let out= createPokemon(name.toLowerCase(),image,hp,defense,attack,speed,height,weight,types)
        res.status(200).send('Poquemon creado')    
    } catch (error) {
        next(error)
    }
})

module.exports = router;