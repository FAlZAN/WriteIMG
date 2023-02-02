import React from "react";
import openaiLogo from "../assets/openai.svg";

function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-300">
      <div className="p-4 flex justify-center items-center">
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
