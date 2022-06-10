import React from 'react';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import s from './landingPage.module.css'
import { getAllPokemons, gettTypes } from '../../Redux/actions';



const LandingPage = () => {
   
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(()=>{
      dispatch(gettTypes())
      dispatch(getAllPokemons())
    },[dispatch])

  
     const handleRoute = () =>{ 
        history.push("/home");
     }
    
    return (
      <div className={s.Start}>
         
           <div className={s.Divbtn}>
            <button className={s.Button} onClick={handleRoute}>PUSH</button>
           </div>
       
      </div>
    );
  };
  
  
  
  export default LandingPage;