import { IconMenu, LogoHopForNav, Xclose } from "../icons";
import { useState, useEffect } from "react";
import "./Header.css";
import { useRef } from "react";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <LogoHopForNav width="74" />
          </div>

          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-linkA" onClick={closeMobileMenu}>
              <a href="#">Profile Setting</a>
            </li>
            <li className="menu-linkB" onClick={closeMobileMenu}>
              <a href="#">Logout</a>
            </li>
          </ul>

          <div ref={menuRef} className="mobile-menu" onClick={handleClick}>
            {click ? <Xclose /> : <IconMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
