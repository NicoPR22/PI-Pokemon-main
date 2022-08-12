import { Link } from "react-router-dom"
import s from './pokemonCadr.module.css'

const PokemonCard = ({image,name,types,id}) =>{
    //let upperName = name.charAt(0).toUpperCase() + name.slice(1)
    return(
      <div className={s.container}>
        <div className={s.redpart}>
            <div className={s.empty}></div>
        </div>
        <div  className={s.divStyle}>      
          <h6 className={s.Idpk}>ID {id}</h6>
          <img className={s.imgStyle} src={image} alt={name}/>
          <Link className={s.link} to={`/home/details/${name}`}><h3 className={s.PkmName}>{name? name.charAt(0).toUpperCase() + name.slice(1): null}</h3></Link>
          <div className={s.DivTypes}>   
              {
                types&&types.map(e=>{
                  return(<p className={s.pStyle}>{e}</p>)
                })
              }
          </div>  
        </div> 
        <div className={s.btn1}>
            <div className={s.btn2}></div>
        </div>
        <div className={s.whitepart}></div>
      </div>
        )
}

export default PokemonCard;

/*
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
<div className={s.DownDiv}></div>*/