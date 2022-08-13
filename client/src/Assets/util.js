
export function filtpoks ( array, payload ) {
  console.log("array " + Object.keys(array[0]))
  console.log("payload " + payload.type + "   " + payload.source)
 const {type, source} = payload
 let out = []
 if ( type !== "all" ) {
    out = array.filter( p=> p.types.includes( type ) === true )
 }else {
  out = array
 }
 if ( source !== "all"){
  if ( source === "api" ) {
    out = out.filter(e=> e.id.toString().length<=6)
  }else {
    out = out.filter(e=> e.id.length>6)
  }
 }
 console.log("final out" + out)
 return out
}