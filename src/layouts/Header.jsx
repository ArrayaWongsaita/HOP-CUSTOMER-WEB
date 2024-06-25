import { IconMenu, LogoHopForNav, Xclose } from "../icons";
import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <LogoHopForNav />
          </div>
          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-linkA" onClick={closeMobileMenu}>
              <a href="#">Profile Setting</a>
            </li>
            <li className="menu-linkB" onClick={closeMobileMenu}>
              <a href="#">Logout</a>
            </li>
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? <Xclose /> : <IconMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
