import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllPokemons, gettTypes } from "../../Redux/actions";
import s from "./CreateForm.module.css";
import axios from 'axios'
import Image from '../../Images/image.jpeg';

function validate(input, prop, range) {
  let errors = {};
  if (prop === "name") {
    if (!input.name) {
      errors.name = "El nombre de tu pokemon es requerido";
      errors.any = true;
    } else if (!/\w\S{2,15}[^0-9]/.test(input.name)) {
      errors.name = "El nombre no es valido";
      errors.any = true;
    }
  } else if (input[prop] < range[prop][0] || input[prop] > range[prop][1]) {
    errors[
      prop
    ] = `Debe ingresar un valor en ${range[prop][0]} y ${range[prop][1]}`;
    errors.any = true;
  }
  return errors;
}

const CreateForm = () => {

  const range = {
    hp: [1, 200],
    attack: [1, 200],
    defense: [1, 200],
    speed: [1, 200],
    height: [1, 100],
    weight: [1, 10000],
  };

  const types = useSelector((state) => state.pokemonTypes);

  const [input, setInput] = React.useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });
  
  const [pkmTypes, setTypes] = React.useState([]);
  
  const [errors, setErrors] = React.useState({ any: true });
  
  const [img, setImg] = React.useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
        range
      )
    );
  };

  const handleType = (e) => {
    e.preventDefault()
    //console.log(e.target.value)
    let newType = e.target.value
    if (newType !== "") { 
      setTypes(
        pkmTypes.includes(newType) 
        ? pkmTypes.filter((t) => t !== newType)
        : pkmTypes.concat(newType)
        );
      }
    };
    
    let handleLoad = async function (e) {
      let  newFile  = e.target.files[0]
      const formdata = new FormData()
      formdata.append('file', newFile)
      formdata.append('upload_preset', 'ml_default');
      const res = (await axios.post("https://api.cloudinary.com/v1_1/nicopr22/image/upload", formdata )).data
      setImg(res.secure_url)
    };
    
    React.useEffect(()=>{
      console.log(img)
    },[img])

  const handleSubmit = (e) => {
    input.types = pkmTypes;
    input.image = img;
    dispatch(createPokemon(input));
    setInput({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
    setTypes([]);
    setImg("")
    alert("Has creado un nuevo pokemon");
  };

  React.useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(gettTypes());
  },[dispatch]);

  return (
    <div>
      <h1 className={s.h1}>Crea Tu Propio Pokemon</h1>
      <div className={s.create}>
        <div className={s.divContainer}>
          <p className={s.p}>Completa Los Siguientes Campos</p>
          <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
            <fieldset className={s.fieldset}>
              <label className={!errors.name ? s.lab : s.danger}>
                Ingresa Un Nombre:
                <input
                  className={s.input}
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.hp ? s.lab : s.danger}>
                HP:
                <input
                  className={s.input}
                  type="number"
                  name="hp"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.attack ? s.lab : s.danger}>
                Ataque:
                <input
                  className={s.input}
                  type="number"
                  name="attack"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.defense ? s.lab : s.danger}>
                Defenza:
                <input
                  className={s.input}
                  type="number"
                  name="defense"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.speed ? s.lab : s.danger}>
                Velocidad:
                <input
                  className={s.input}
                  type="number"
                  name="speed"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.height ? s.lab : s.danger}>
                Altura:
                <input
                  className={s.input}
                  type="number"
                  name="height"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={!errors.weight ? s.lab : s.danger}>
                Peso:
                <input
                  className={s.input}
                  type="number"
                  name="weight"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className={pkmTypes.length === 0 ? s.danger : s.lab}>
                Tipos
                <select
                  className={s.select}
                  name="type"
                  onChange={(e) => handleType(e)}
                >
                  <optgroup>
                    <option value="" >Seleciona al menos uno</option>
                    {types &&
                      types.filter((e, i) => {
                        return types.indexOf(e) === i;
                      }).map((e,i) => {
                        return <option key={i} value={e}>{e}</option>;
                      })}
                  </optgroup>
                </select>
              </label>
            </fieldset>
            {!errors.any && pkmTypes.length > 0 && (
              <input className={s.input} type="submit" value="Crear" />
            )}
          </form>
        </div>
        <div className={s.right}>
          <div className={s.dbpoks}>  
            <img className={s.dbpoks} src={!img ? Image : img}/>
          </div>
          <label className={s.lab}>
            Carga Una Imagen:
            <input className={s.input} id="file" type="file" name="file" onChange={(e)=> handleLoad(e)}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
/*
      <form className={s.Form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.Container}>
          <div className={s.Field}>
            <label htmlFor="">Nombre</label>
            <input
              className={errors.name && "danger"}
              type="text"
              name="name"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            {!errors.name ? null : <p className={s.danger}>{errors.name}</p>}
          </div>
          <div className={s.Field}>
            <label htmlFor="">HP {input.value}</label>
            <input
              className={errors.hp && "danger"}
              type="number"
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            {!errors.hp ? null : <p className={s.danger}>{errors.hp}</p>}
          </div>
          <div className={s.Field}>
            <label htmlFor="">Ataque</label>
            <input
              className={errors.attack && "danger"}
              type="number"
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            {!errors.attack ? null : (
              <p className={s.danger}>{errors.attack}</p>
            )}
          </div>
          <div className={s.Field}>
            <label htmlFor="">Defenza</label>
            <input
              className={errors.defense && "danger"}
              type="number"
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            {!errors.defense ? null : (
              <p className={s.danger}>{errors.defense}</p>
            )}
          </div>
          <div className={s.Field}>
            <label htmlFor="">Velocidad</label>
            <input
              className={errors.speed && "danger"}
              type="number"
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            {!errors.speed ? null : <p className={s.danger}>{errors.speed}</p>}
          </div>
          <div className={s.Field}>
            <label htmlFor="">Altura</label>
            <input
              className={errors.height && "danger"}
              type="number"
              name="height"
              onChange={(e) => handleChange(e)}
            />
            {!errors.height ? null : (
              <p className={s.danger}>{errors.height}</p>
            )}
          </div>
          <div className={s.Field}>
            <label htmlFor="">Peso</label>
            <input
              className={errors.weight && "danger"}
              type="number"
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            {!errors.weight ? null : (
              <p className={s.danger}>{errors.weight}</p>
            )}
          </div>
        </div>
        <label className={s.Label}>Tipos (Debes seleccionar al menos 1)</label>
        <div className={s.Types}>
          {/*types &&
            types
              .filter((e, i) => {
                return types.indexOf(e) === i;
              })
              .map((e) => {
                return (
                  <div>
                    <label>{e}</label>
                    <input
                      type="checkbox"
                      name={e}
                      onClick={(e) => handleType(e.target.name)}
                    />
                  </div>
                );
              })}
        </div>

        {!errors.any && pkmTypes.length && (
          <button className={s.BtnSub} type="submit">
            Crear
          </button>
        )}
      </form>*/