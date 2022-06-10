const { Router } = require('express');
const {createPokemon, getPokemonsByID, getAllPokemons, getPokemonByName} = require('../controllers/pokemonControllers');
const {Pokemon, Type} = require('../db')

const router = Router();
/*RESUELVE EL PEDIDOS DE TODOS LOS POKEMONES */
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


/*RESUELVE UN PEDIDO DE POQUEMON POR ID */
router.get('/:id', async (req,res,next)=>{
    try {
        const id= req.params.id
        let out= await getPokemonsByID(id)
        res.status(200).send(out)
    } catch (error) {
        next(error)
    }
})

/*CREA UN NUEVO POKEMON DE USUARIO*/
router.post('',(req,res,next)=>{
    try {
        const {name,hp,defense,attack,speed,height,weight,types}= req.body
        let out= createPokemon(name,hp,defense,attack,speed,height,weight,types)
        res.status(200).send('Poquemon creado')    
    } catch (error) {
        next(error)
    }
})

module.exports = router;