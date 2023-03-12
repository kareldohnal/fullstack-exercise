import React from 'react';
import {NavLink} from "react-router-dom";
import "../header.scss"

type Props = {

};

const MainMenu = ({}: Props) => {
 return (
  <div className={"mainMenu"}>
   <NavLink to={"/"} >Recent Articles</NavLink>
   <NavLink to={"/about"} >About</NavLink>
  </div>
 );
};

export default MainMenu;
