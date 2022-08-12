import {CREATE_POKEMON, GET_ALL_POKEMONS ,GET_TYPES, GET_POKEMON_BY_NAME,REMOVE_POKEMON_NAME, TYPE_FILTER,SOURCE_FILTER,CLEAN_NAME, REMOVE_POKEMON_DB} from "./actions";

const initalState={
    pokemonList:[],
    pokemonTypes:[],
    pokemonName:{},
    pokemonFtrd:[],
    pokemonDb:[]
}

function reducer (state=initalState,{ type, payload }) {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemonList: state.pokemonList.concat(payload.sort((a,b)=> ( a.name > b.name? 1 :a.name< b.name? -1: 0))),
                pokemonFtrd: state.pokemonFtrd.concat(payload.sort((a,b)=> ( a.name > b.name? 1 :a.name< b.name? -1: 0))),
                pokemonDb: state.pokemonDb.concat(payload.filter(e=> e.id.length>6)),
            }
             
        case GET_TYPES: 
            return {
                ...state,
                pokemonTypes: state.pokemonTypes.concat(payload)
            }   

        case CREATE_POKEMON:
            return {
                ...state
            }
        
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemonName: payload
            }

        case REMOVE_POKEMON_NAME:
            return {
                ...state,
                pokemonName: {}
            }

        case TYPE_FILTER:
            return {
                ...state,
                pokemonFtrd: payload!=="all"
                ? state.pokemonList.filter(p=> p.types.includes(payload)===true)
                : state.pokemonList
            }

        case SOURCE_FILTER:
            return {
                ...state,
                pokemonFtrd: payload==="api"
                ? state.pokemonList.filter(e=> e.id.toString().length<=6)
                : payload==="created"
                ? state.pokemonList.filter(e=> e.id.length>6)
                : state.pokemonList
            }

        case CLEAN_NAME:
            return{
                ...state,
                pokemonName:{}
            }

        case REMOVE_POKEMON_DB:
            return{
                ...state,
                pokemonDb: []
            } 
    
        default: return state
        
          
    }
}

export default reducer;