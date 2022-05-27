const axios = require ('axios')
const {Tipo} = require('../db')

async function setTypesToDB(){
    try {
        let types= (await axios("https://pokeapi.co/api/v2/type")).data.results.map(t=> ({name: t.name}))
        await Tipo.bulkCreate(types)
        console.log('Tipos agregados correctamente')
    } catch (error) {
        console.log(error)
    }
}

const getTypesDB = async ()=>{
    try {
        return (await Tipo.findAll()).map(e=> e.name)
    } catch (error) {
        console.log(error)
    }
     
}

module.exports = {
    setTypesToDB,
    getTypesDB
}
/*
1. Pasar de async away a promesas
2. Agregar la ruta de Delete o put
3. Cread nuevo componente de react en Nueva ruta
4. Crear filtro
5. Que es el thunk y como funciona
6. como se conecta el back con el front
7. Paginado con next y previous
8. Agregar nuevo dato para renderizar en las cartas del home
9. Crear filtro nuevo con dato diferente
10. Explicar ciclo/recorrido del post/get
11. de que otra forma podrías relacionar las dos tablas? 
12.que son las primary key y las foreign key? 
13. porque una image lleva dataype text?
14. También le pueden pedir hacer un nuevo formulario donde solo validen un solo dato con su input (eso preguntó Mora en el PI de FOOD)  
 */