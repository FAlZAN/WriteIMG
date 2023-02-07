import React, { useState, useEffect } from "react";
import logoLight from "../assets/logo-light.svg";
import { Link } from "react-router-dom";
import ham from "../assets/ham.svg";
import close from "../assets/close.svg";

function Header() {
  const [isHamMenuVisible, setIsHamMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const handleHamMenu = () => {
    isHamMenuVisible ? setIsHamMenuVisible(false) : setIsHamMenuVisible(true);
  };

  return (
    <header className="w-full bg-white/50 backdrop-blur fixed left-0 top-0 z-10">
      <div className="px-4 py-4 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              className="w-24 h-auto"
              src={logoLight}
              alt="write image logo"
            />
          </Link>
        </div>

        {windowWidth < 641 ? (
          // mobile
          <div className="cursor-pointer " onClick={handleHamMenu}>
            {isHamMenuVisible ? (
              <img className="w-8 h-auto" src={close} alt="close icon" />
            ) : (
              <img className="w-8 h-auto" src={ham} alt="ham menu icon" />
            )}
          </div>
        ) : (
          // pc
          <div className="flex gap-4">
            <Link to="/community">
              <button className="bg-indigo-500 px-4 py-2 text-white rounded-md">
                Community
              </button>
            </Link>

            <Link to="/post">
              <button className="bg-green-500 px-4 py-2 text-white rounded-md">
                Create
              </button>
            </Link>
          </div>
        )}
      </div>

      {isHamMenuVisible && (
        <div
          className="bg-black/50 h-[95vh] text-white flex justify-center items-center"
          onClick={() => {
            setIsHamMenuVisible(false);
          }}
        >
          <ul className="w-3/5 h-full flex flex-col justify-center items-center gap-4">
            <li className="w-full">
              <Link to="/community">
                <button className="bg-indigo-500 w-full px-4 py-2 rounded-md">
                  Community Showcase
                </button>
              </Link>
            </li>

            <li className="w-full">
              <Link to="/post">
                <button className="bg-green-500 w-full px-4 py-2 rounded-md">
                  Create Image
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
