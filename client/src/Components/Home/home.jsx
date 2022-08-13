import React from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { sourceFilter, typeFilter, filtPk } from '../../Redux/actions';
import FilterBar from '../FilterBar/filterBar';
import PokemonCard from '../PokemonCard/pokemonCard'
import s from './Home.module.css'


const Home = () => {

  const dispatch = useDispatch()
 
  const source= useSelector(state=>state.pokemonFtrd)
  
  const [pokemons, setPoks]= React.useState([])
 
  const [order, setOrder] = React.useState("abc")
  
  const [page, setPage] = React.useState(0)


  const pages = [[0,12],[12,24],[24,36],[36,48]]


 React.useEffect(() => {
    setPoks(source)  
  }, [source])

  
  const invert = ()=> { 
      pokemons.reverse()
      order? setOrder("") : setOrder("abc")
      setPage(0)
    }
  
  
  const sortBy = (standar)=>{
    if(standar==="abc"){
      pokemons.sort((a,b)=> ( a.name > b.name? 1 :a.name< b.name? -1: 0))
      order? setOrder("") : setOrder("abc")
    }else{
      pokemons.sort((a,b)=>  (a.hp > b.hp? 1 :a.hp < b.hp? -1 :0))
      order? setOrder("") : setOrder("abc")
    }
  }

  const filterHandler = (type, source)=>{
    dispatch(filtPk(type, source))
    //setPoks(source)
    setPage(0)
  }

  const filter = (e)=>{
    e.preventDefault()
    dispatch(typeFilter(e.target.value))
    setPoks(source)
    setPage(0)
  }

  const filterBySrc = (e)=>{
    e.preventDefault()
    dispatch(sourceFilter(e.target.value))
    setPoks(source)
    setPage(0)
  }
  
  const next = ()=>{
    if(page< pages.length-1 && source.length>12){
      setPage(
          page + 1
        )
      }
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
        
  const before = ()=> {
    if(page>0){
        setPage(
          page - 1
        )
     }
     window.scroll({
      top: 0,
      behavior: 'smooth'
    });
    }

  const section = pokemons.length>0? pokemons.slice(pages[page][0],pages[page][1]):[]
       
    return (
     <div  className={s.Container}>     
        <FilterBar sortBy={sortBy} invert={invert} filter={filter} filterBySrc={filterBySrc} filterHandler={filterHandler}/>
        <div  className={s.DivStyle}>
          {           
            section&&section.map(e=>{
              return(
                <PokemonCard image={e.image} name={e.name} types={e.types} id={e.id}  />
              )
            })
          } 
        </div> 

        {
          source.length>12
          ? 
            <div className={s.PageButons}>
              <button onClick={before}>Anterior</button>
              <span className={s.span}>  pagina {page + 1}  </span>
              <button onClick={next}>Siguiente</button>
            </div>
          : <p></p>
        }

      </div>
    );
  };
  
  export default Home;

