/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Header.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconMenu } from "../icons/IconMenu";
import { IconLogoHopForNav } from "../icons/IconLogoHopForNav";
import { IconXClose } from "../icons/IconXClose";
import useCustomer from "../hooks/customerHook";

export default function Header() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const menuRef = useRef(null);
  const { logout } = useCustomer();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setTimeout(() => {
        closeMobileMenu();
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTestChat = () => {
    console.log("na");
    closeMobileMenu();
  };
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <IconLogoHopForNav width="74" />
          </div>

          <ul className={click ? "menu active" : "menu"}>
            {/* <li className="menu-linkA" onClick={handleTestChat}>
              <a href="/">Home</a>
            </li> */}
            <li className="menu-linkA" onClick={handleTestChat}>
              <a href="#">Profile Setting</a>
            </li>
            <li className="menu-linkB" onClick={handleLogout}>
              <a href="#">Logout</a>
            </li>
          </ul>

          <div ref={menuRef} className="mobile-menu" onClick={handleClick}>
            {click ? <IconXClose /> : <IconMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
