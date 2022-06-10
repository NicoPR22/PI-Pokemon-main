import { Link } from "react-router-dom"
import s from './pokemonCadr.module.css'

const PokemonCard = ({image,name,types,id}) =>{
    return(
      <div>
        <div className={s.UpDiv}></div>
        <div  className={s.divStile}>      
            <h6 className={s.Idpk}>ID {id}</h6>
            <img className={s.imgStyle} src={image} alt={name}/>
            <Link to={`/home/details/${name}`}><h3 className={s.PkmName}>{name}</h3></Link>
            <div className={s.DivTypes}>
              <h5 className={s.Types}>TIPOS</h5>
              <div className={s.Ptypes}>
                {
                  types&&types.map(e=>{
                    return(<p className={s.pStyle}>{e}</p>)
                  })
                }

              </div>
            </div>  
        </div> 
        <div className={s.DownDiv}></div>
      </div>




        )
}

export default PokemonCard;