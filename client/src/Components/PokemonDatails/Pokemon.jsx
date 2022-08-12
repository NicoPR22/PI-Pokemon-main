import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, claeanName } from "../../Redux/actions";
import { useEffect } from "react";
import s from "./Pokemon.module.css";

const PokemonDetail = (p) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonByName(p.p));
    return () => {
      dispatch(claeanName());
    };
  }, [dispatch, p.p]);

  const pk = useSelector((state) => state.pokemonName);

  return (
    <div className={s.Container}>
      <div className={s.SubContainer}>
        <div className={s.DivImage}>
          <h4 className={s.pokId}>{pk.id}</h4>
          <img className={s.imageStyle} src={pk.image} alt={pk.name} />
          <h2 className={s.pokName}>{pk.name? pk.name.charAt(0).toUpperCase() + pk.name.slice(1): null}</h2>
          <div className={s.TypesDiv}>
            {pk.types && pk.types.map((e) => <p className={s.typeNom}>{e}</p>)}
          </div>
        </div>
        <div className={s.StatsDiv}>
          <table>
            <caption className={s.caption}>Stast</caption>
            <tbody>
              <tr class="data">
                <th>
                  <span class={s.span}>HP:</span>
                </th>
                <td className={s.td}>{pk.hp}</td>
              </tr>
              <tr class="data">
                <th>
                  <span class={s.span}>Velocidad:</span>
                </th>
                <td className={s.td}>{pk.speed}</td>
              </tr>
              <tr class="data">
                <th>
                  <span class={s.span}>Ataque:</span>
                </th>
                <td className={s.td}>{pk.attack}</td>
              </tr>
              <tr class="data">
                <th>
                  <span class={s.span}>Defensa:</span>
                </th>
                <td className={s.td}>{pk.defense}</td>
              </tr>
              <tr class="data">
                <th>
                  <span class={s.span}>Altura:</span>
                </th>
                <td className={s.td}>{pk.height}</td>
              </tr>
              <tr class="data">
                <th>
                  <span class={s.span}>Peso:</span>
                </th>
                <td className={s.td}>{pk.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
/* <div>
<img style="" src={pk.image} alt={pk.name}/>
<PokemonCard image={pk.image} name={pk.name} types={pk.types} id={pk.id}  />
        </div>*/
