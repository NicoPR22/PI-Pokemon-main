const axios = require ('axios')
const { Op, where } = require('sequelize');
const {Pokemon, Tipo} = require('../db')

const getAllPokemonsAPI = async ()=>{ // ANDA NO TOCAR!
    try {
        let poke = (await axios('https://pokeapi.co/api/v2/pokemon'))//Primeros 20
        let mons = (await axios(poke.data.next)).data.results //Otros 20
        let pokemons= poke.data.results.concat(mons)  // 40 
        pokemons= pokemons.map(e=> axios(e.url))
        let dataPokemon =( await axios.all(pokemons)).map(e=> e.data)
        let allPokemons = dataPokemon.map( p=> (
               {
                id: p.id,
                name: p.name,
                image: p.sprites.other.home.front_default,
                types: p.types.map(t=> (t.type.name) ),
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense:  p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight
               } 
            )
        )
        return allPokemons
    } catch (error) {
        next(error)
    }
}

const getAllPokemonsDB= async ()=>{ // FALTA ARREGLAR LA FORMA DE LOS TIPOS(ES ARREGLO DE OBJETOS TIENE QUE SER ARREGLO DE STRINGS)
    try {
        let allPokemons= await Pokemon.findAll(
                {
                    include: [
                        { model: Tipo, 
                          attributes:[ "name"],
                          through: { attributes: [] }
                        }
                    ]
                }
            )
        return allPokemons
    } catch (error) {
        next(error)
    }
}

const getAllPokemons = async ()=> {
    try {
        let api= await getAllPokemonsAPI()
        let bd= await getAllPokemonsDB()
        let total= api.concat(bd)
        return total
    } catch (error) {
        next(error)
    }
}


const getPokemonsByID= async (id)=>{
    try {
        console.log('TIPO DE ID' + id.length)
        let pokemon
        if(id.length<4){
        let data = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
        pokemon= {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other.home.front_default,
                    types: data.types.map(t=> (t.type.name) ),
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense:  data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    height: data.height,
                    weight: data.weight
                }
            }else{
                pokemon = await Pokemon.findOne(
                    {
                        where:{ID:id},
                        include: [
                            { model: Tipo, 
                                attributes:[ "name"],
                                through: { attributes: [] }
                            }
                        ]
                    }
                    )
                }
    return(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const getPokemonByName = async (name)=>{
    try {
        return (await getAllPokemons()).find(e=> e.name===name)
    } catch (error) {
        console.log(error)
    }

}

const createPokemon= async (name,vida,fuerza,defensa,velocidad,altura,peso,tipos)=>{
    try {
        const newPokemon= await Pokemon.create({name,vida,fuerza,defensa,velocidad,altura,peso})
        const types= await Tipo.findAll({
            where:{ name : {[Op.in]: tipos} } 
        })
        newPokemon.addTipo(types)
        return ('Pokemon creado correctamente')
    } catch (error) {
        next(error)
    }

}



module.exports={
    getAllPokemonsAPI,
    createPokemon,
    getAllPokemonsDB,
    getAllPokemons,
    getPokemonsByID,
    getPokemonByName
}