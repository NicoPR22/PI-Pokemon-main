import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonByName } from '../../Redux/actions';
import { useEffect } from 'react';
import s from './Pokemon.module.css'



const PokemonDetail = (p)=>{

    const imageStyle ={
        height:'400px',
        width:'400px'
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPokemonByName(p.p))
    },[dispatch,p.p])
    
    const pk = useSelector(state=>state.pokemonName)


    return(
        <div className={s.Container}>
            <div className={s.SubContainer}>
                <div className={s.DivImage}>
                    <h4 className={s.PokId}>{pk.id}</h4>
                    <img style={imageStyle} src={pk.image} alt={pk.name}/>
                    <h2 className={s.PokName}>{pk.name}</h2>
                    <div className={s.TypesDiv}>
                        {
                            pk.types&&pk.types.map(e=>
                                <p className={s.TypeNom}>{e}</p>)
                            }
                    </div>
                </div>
                <div className={s.StatsDiv}>
                    <h3>STATS</h3>
                    <div className={s.Field}>
                        <p className={s.p}>HP:</p><span className={s.span}>{pk.hp}</span>
                    </div>
                    <div className={s.Field}>
                        <p className={s.p}>Velocidad:</p><span  className={s.span}>{pk.speed}</span>
                    </div>
                    <div className={s.Field}>
                        <p className={s.p}>Ataque:</p><span className={s.span}>{pk.attack}</span>
                    </div>
                    <div className={s.Field}>
                        <p className={s.p}>Defensa:</p><span  className={s.span}>{pk.defense}</span>
                    </div>
                    <div className={s.Field}>
                        <p className={s.p}>Defensa;</p><span  className={s.span}>{pk.height}</span>
                    </div>
                    <div className={s.Field}>
                        <p className={s.p}>Peso:</p><span  className={s.span}>{pk.weight}</span>
                    </div>        
                </div>
            </div>
            <div>

            </div>
        </div>
    )
    
}

export default PokemonDetail
       /* <div>
<img style="" src={pk.image} alt={pk.name}/>
<PokemonCard image={pk.image} name={pk.name} types={pk.types} id={pk.id}  />
        </div>*/