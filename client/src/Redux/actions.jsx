import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME'
export const REMOVE_POKEMON_NAME = 'REMOVE_POKEMON_NAME'
export const TYPE_FILTER = 'TYPE_FILTER'
export const SOURCE_FILTER = 'SOURCE_FILTER'
export const CLEAN_NAME = 'CLEAN_NAME'
export const REMOVE_POKEMON_DB = 'REMOVE_POKEMON_DB'
export const FILT = "FILT"



export function getAllPokemons() {
    return (dispatch)=>{
        return axios('http://localhost:3001/pokemons')
        .then(res=> dispatch({type:GET_ALL_POKEMONS, payload:res.data}))
    }
}

export function gettTypes() {
    return (dispatch)=>{
        return axios('http://localhost:3001/types')
        .then(res=> dispatch({type:GET_TYPES, payload:res.data}))
    }
}

export function createPokemon(values) {
    return(dispatch)=>{
        return axios.post('http://localhost:3001/pokemons',values)
        .then(res=> dispatch({type: CREATE_POKEMON, payload: res}))
    }
}

export function getPokemonByName(name) {
    return(dispatch=>{
        return axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(res=> dispatch({type:GET_POKEMON_BY_NAME,payload:res.data}))
    })   
}

export function removePokemonName() {
    return { type: REMOVE_POKEMON_NAME };
  }

export function typeFilter(type) {
    return(dispatch=>{
        return (dispatch({type: TYPE_FILTER, payload: type}) )
    })
}

export function sourceFilter(standar) {
    return(dispatch=>{
        return (dispatch({type: SOURCE_FILTER, payload: standar}) )
    })
}

export function claeanName(){
    return(dispatch=>{
        return(dispatch({type:CLEAN_NAME}))
    })
}

export function removePokemonDb() {
    return { type: REMOVE_POKEMON_DB };
  }

export function filtPk(type, source) {
    return { type: FILT, payload:{type, source} };
}


