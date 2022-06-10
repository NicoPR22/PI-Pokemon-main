import React from 'react';
import { Link } from "react-router-dom"
import SearchBar from '../SearchBar/searchBar';
import s from './NavBar.module.css'


const NavBar = ({onSearch})=>{
    return(
      <div className={s.Container}>
        <nav className={s.Nav}>
           <div className={s.Links}>
              <Link to='/home'> <span className={s.Span}>Home</span> </Link>
              <Link to='/home/create'> <span className={s.Span}>Crear Pokemon</span> </Link>   
            </div>
            <div className={s.SearchBar}><SearchBar onSearch={onSearch}/></div>
        </nav>
      </div>
      

    )
}

export default NavBar;
/*
      <Link to='/'>
          <span className={s.Span}>
          <img id="" src= "" width="30" height="30" className="" alt="" />
          Henry - PI Pokemon
        </span>
      </Link>*/