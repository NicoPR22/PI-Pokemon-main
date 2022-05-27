const { Router } = require('express');
const { getAllPokemonsAPI, createPokemon, getAllPokemonsDB } = require('../controllers/pokemonControllers');
const pokemonRoutes = require('./pokemonRoutes')
const typesRoutes = require('./typesRoutes')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons',pokemonRoutes)

router.use('/types',typesRoutes)






module.exports = router;
