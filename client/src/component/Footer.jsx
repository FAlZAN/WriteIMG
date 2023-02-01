import React from "react";
import openaiLogo from "../assets/openai.svg";

function Footer() {
  return (
    <footer>
      <div className="pb-4 pt-8 flex justify-center items-center">
        <p className="text-base font-semibold">Powered by</p>
        <span className="ml-1">
          <a href="https://openai.com/dall-e-2/" target="_blank">
            <img src={openaiLogo} alt="open ai logo" />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
