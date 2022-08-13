import React from 'react'
import { useSelector} from 'react-redux';
import s from './FilterBar.module.css'

const FilterBar = ({sortBy, invert, filter, filterBySrc, filterHandler})=> {

    const types = useSelector(state=>state.pokemonTypes)

    const handleChangeType = (e)=> {
        e.preventDefault()
        let source = document.getElementById('source').value
        console.log("filterbar source " + source)
        filterHandler(e.target.value, source)
        //filter(e)
    }

    const handleChangeSource = (e)=> {
        e.preventDefault()
        let type = document.getElementById('type').value
        filterHandler(type, e.target.value)
       // filterBySrc(e)
    }

    return(
        <div className={s.Container}>
            <div className={s.SubContainer}>
                <label className={s.FiltLabel}>Filtrar por:</label>
                <div className={s.FilterDiv}>
                    <label className={s.Label}>Tipo</label>
                    <select className={s.select} name="" id="type" onChange={e=> handleChangeType(e)}>
                        <optgroup>
                            <option id="" value="all">Todos</option>
                            {
                                types&&types.map(e=>{return(<option value={e}>{e}</option>)})
                            }
                        </optgroup>
                    </select>
                </div>
                <div className={s.FilterDiv}>
                    <label className={s.Label}>Origen</label>
                    <select className={s.select} name="" id="source" onChange={e=>{handleChangeSource(e)}}>
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
                <div className={s.buttons}>
                    <button className={s.button} value="abc" onClick={(e)=> sortBy(e.target.value)}>A/Z</button>
                    <button  className={s.button}value="id"  onClick={(e)=> sortBy(e.target.value)}>Fuerza</button>
                    <button className={s.button } onClick={()=> invert()}>A-Z/Z-A</button>
                </div>
                 
            </div>
        </div>
    )

}

export default FilterBar;