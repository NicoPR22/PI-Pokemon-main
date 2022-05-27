const { Router } = require('express');
const {createPokemon, getPokemonsByID, getAllPokemons, getPokemonByName} = require('../controllers/pokemonControllers');
const {Pokemon, Tipo} = require('../db')

const router = Router();
/*RESUELVE EL PEDIDOS DE TODOS LOS POKEMONES Y EL DE UN NOMBRE EN PARTICULAR */
router.get('',async (req,res,next)=>{
    try {
        let out=''
        const name = req.query.name // EXTRAE NOMBRE DE LA QUERY, SI HAY BUSCA POR NOMBRE
        if(name){
            out= await getPokemonByName(name)
            if(out){
                return res.status(200).send(out)
            }else{
                return res.status(404).send(`No exis un Pokemon  con el nombre ${name}`)
            } 
        }
        out= await getAllPokemons() // NO HAY QUERY Y BUSCA TODOS(DB Y API)
        res.status(200).send(out)   
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
        const {name,vida,fuerza,defensa,velocidad,altura,peso,tipos}= req.body
        let out= createPokemon(name,vida,fuerza,defensa,velocidad,altura,peso,tipos)
        res.status(200).send('Poquemon creado')    
    } catch (error) {
        next(error)
    }
})





module.exports = router;