import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "./landingPage.module.css";
import { getAllPokemons, gettTypes } from "../../Redux/actions";
import logo from '../../Images/logoHenry.png'
import logoln from '../../Images/icons8-linkedin-circled-48.png'
import logogh from '../../Images/icons8-github-48.png'

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(gettTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  const handleRoute = () => {
    history.push("/home");
  };

  return (
    <div className={s.Start}>
      <div className={s.imagecontainer}>
      <img className={s.img} src="https://res.cloudinary.com/nicopr22/image/upload/v1660247703/pokemon/pokemon-logo-png-1421_k98urf.png" alt="logo"/>
    </div>
    
    <div class={s.container}>
        <div className={s.redpart}>
        </div>
        <button class={s.btn1} onClick={handleRoute}>
            PUSH
        </button>
        <div className={s.whitepart}></div>
    </div>
    <div className={s.footer}>
      <div className={s.title}>
        <img id="logoHenry" src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
      <span >
          Henry - Proyecto individual
        </span>
      </div>
      <div className={s.me}>
        <span>Nicolas Burgos</span>
        <a href="https://www.linkedin.com/in/nicolas-exequiel-burgos-fullstackdeveloper/">
          <img id="logoln" src={logoln} width="30" height="30"  alt="ln" />
        </a>
        <a href="https://github.com/NicoPR22">
          <img id="logoHenry" src={logogh} width="30" height="30"  alt="gh" />
        </a>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
