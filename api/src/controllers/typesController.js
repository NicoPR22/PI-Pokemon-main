const axios = require ('axios')
const {Type} = require('../db')

async function setTypesToDB(){
    try {
        let types= (await axios("https://pokeapi.co/api/v2/type")).data.results.map(t=> ({name: t.name}))
        await Type.bulkCreate(types)
        console.log('Tipos agregados correctamente')
    } catch (error) {
        console.log(error)
    }
}

const getTypesDB = async ()=>{
    try {
        return (await Type.findAll()).map(e=> e.name)
    } catch (error) {
        console.log(error)
    }
     
}

module.exports = {
    setTypesToDB,
    getTypesDB
}
