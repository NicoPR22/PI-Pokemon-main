import s from './App.module.css';
import axios from 'axios';
import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {Route, useHistory} from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingpage';
import Home from './Components/Home/home';
import NavBar from './Components/NavBar/navBar';
import CreateForm from './Components/Create/CreateForm'
import Container from './Components/Container/Container';
import PokemonDetail from './Components/PokemonDatails/Pokemon';



function App() {
  const history = useHistory();
  const dispatch = useDispatch()
  const pokemons= useSelector(state=>state.pokemonList)
  const [name,setName] = React.useState({})
  
  const onSearch = (p)=>{
    axios(`http://localhost:3001/pokemons?name=${p}`)
    .then(res=>{
      res&&setName(res.data)
    })
    .catch(e=>{alert(`No se enconto un Pokemon con el nombre ${p}`)})
  }

  const onClose = ()=>{
    setName({})
    history.push("/home");
  }
  return (
    <div className={s.App}> 
      <Route path='/' exact component={LandingPage}/>
      <Route path='/home' render= { ()=> <NavBar onSearch={onSearch}/>}/>
      <Route path='/home/search' exact render= { ()=> <Container name={name} onClose={onClose}/>}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/home/create' exact component={CreateForm}/>
      <Route exact path='/home/details/:name' 
             render={({match}) => <PokemonDetail p={match.params.name}/>}/>
    </div>
  );
}

export default App;
