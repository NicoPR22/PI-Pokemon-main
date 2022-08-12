const axios = require ('axios');
const e = require('express');
const { Op, where } = require('sequelize');
const {Pokemon, Type} = require('../db')

const getAllPokemonsAPI = async ()=>{ 
    try {
        const {results,next}= (await axios('https://pokeapi.co/api/v2/pokemon')).data//Primeros 20
        let poke = results
        let mons =(await axios(next)).data.results //Otros 20
        let pokemons= poke.concat(mons)  // 40 
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
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight
               } 
            )
        )
        return allPokemons
    } catch (error) {
        console.log(error)
    }
}

const getAllPokemonsDB= async ()=>{ 
    try {
        let allPokemons= await Pokemon.findAll(
                {
                 include: 
                   { model: Type, 
                       attributes:[ "name"],
                       as: "types",
                     through: { attributes: [] }
                   }
                }
            )
        const jout= allPokemons.map(p=> p.toJSON())
        const out= jout.map(p=>{
            const tp = p.types.map(t=> t.name)
            return{...p, types:tp}
        })        
        return out
    } catch (error) {
        console.log(error)
    }
}

const getAllPokemons = async ()=> {
    try {
        let api= await getAllPokemonsAPI()
        let bd= await getAllPokemonsDB()
        let total=  api.concat(bd)
        return total
    } catch (error) {
        console.log(error)
    }
}


const getPokemonsByID= async (id)=>{
    try {
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
                    { where:{id:id},
                        include: { model: Type, 
                                   attributes:[ "name"],
                                   as: "types",
                                   through: { attributes: [] }}         
                    })
                    let out= pokemon.toJSON()
                    let types=out.types.map(t=> t.name)
                    out.types=types
                    //console.log(types)
                    pokemon=out
                }
    return(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const getPokemonByName = async (name)=>{
    try {
        
        let search = await Pokemon.findOne(
            { where:{name:name},
                include: { model: Type, 
                           attributes:[ "name"],
                           as: "types",
                           through: { attributes: [] }}         
            })
            if(search!==null){
                let out= search.toJSON()
                let types=out.types.map(t=> t.name)
                out.types=types
                return out
            }else{
                search = (await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
                if(search){
                    let pokemon=
                      {
                        id: search.id,
                        name: search.name,
                        image: search.sprites.other.home.front_default,
                        types: search.types.map(t=> (t.type.name) ),
                        hp: search.stats[0].base_stat,
                        attack: search.stats[1].base_stat,
                        defense: search.stats[2].base_stat,
                        speed: search.stats[5].base_stat,
                        height: search.height,
                        weight: search.weight
                    }
                    return pokemon
                } else return {}
            }

    } catch (error) {
        console.log(error)
    }

}

const createPokemon= async (name,image,hp,defense,attack,speed,height,weight,types)=>{
    try {
        const newPokemon= await Pokemon.create({name,image,hp,defense,attack,speed,height,weight})
        const typesDB= await Type.findAll({
            where:{ name : {[Op.in]: types} }                                       
        })
        newPokemon.addType(typesDB)
        return ('Pokemon creado correctamente')
    } catch (error) {
        console.log(error)
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