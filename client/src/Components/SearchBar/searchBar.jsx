import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import s from './SearchBar.module.css'

const SearchBar = ({onSearch})=> {

  const history = useHistory();

  const[name, setName] = useState("")


  const handleChange = (e)=>{
    
      setName(e.target.value)
  
  }
 
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if(name.length>0){
        onSearch(name.toLocaleLowerCase())
        setName("")
        history.push("/home/search");
      }else alert('Debes ingresar un nombre')
    }}>
      <div>
        <input
          className={s.text}
          type="text"
          placeholder="nombre..."
          value={name}
          onChange={e => handleChange(e)}
        />
        <input className={s.button} type="submit" value="Buscar" />
      </div>
    </form>
  );
}

export default SearchBar;