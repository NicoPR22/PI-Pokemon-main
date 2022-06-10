import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const SearchBar = ({onSearch})=> {

  const history = useHistory();

  const[name, setName] = useState("")
 
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(name)
      setName("")
      history.push("/home/search");
    }}>
      <div>
        <input
          type="text"
          placeholder="nombre o ID..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type="submit" value="Buscar" />
      </div>
    </form>
  );
}

export default SearchBar;