import React from 'react'
import { useSelector} from 'react-redux';
import s from './FilterBar.module.css'

const FilterBar = ({sortBy, invert, filter, filterBySrc})=> {

    const types = useSelector(state=>state.pokemonTypes)
    return(
        <div className={s.Container}>
            <div className={s.SubContainer}>
                <label className={s.FiltLabel}>Filtrar por:</label>
                <div className={s.FilterDiv}>
                    <label className={s.Label}>Tipo</label>
                    <select name="" id="" onChange={e=>filter(e)}>
                        <optgroup>
                            <option id="opall" value="all">Todos</option>
                            {
                                types&&types.map(e=>{return(<option value={e}>{e}</option>)})
                            }
                        </optgroup>
                    </select>
                </div>
                <div className={s.FilterDiv}>
                    <label className={s.Label}>Origen</label>
                    <select name="" id="" onChange={e=>{filterBySrc(e)}}>
                        <optgroup>
                            <option value="all">Todos</option>
                            <option value="api">Api</option>
                            <option value="created">Creados</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div className={s.Sort}>
                <label className={s.FiltLabel}>Ordenar por:</label>
                <button value="abc" onClick={(e)=> sortBy(e.target.value)}>A/Z</button>
                <button value="id"  onClick={(e)=> sortBy(e.target.value)}>Fuerza</button>
                <button onClick={()=> invert()}>A-Z/Z-A</button>
                 
            </div>
        </div>
    )

}

export default FilterBar;