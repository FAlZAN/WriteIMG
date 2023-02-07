import React, { useContext } from "react";
import download from "../assets/download.svg";
import expand from "../assets/expand.svg";
import { downloadImage } from "../utils/index";

//global community context
import { CommunityContext } from "../context/CommunityContext";

function CommunityPostOverlay({
  _id,
  name,
  prompt,
  photo,
  setIsFullScreenVisible,
}) {
  const { dispatch } = useContext(CommunityContext);
  const colors = [
    "bg-slate-300",
    "bg-gray-300",
    "bg-zinc-300",
    "bg-neutral-300",
    "bg-stone-300",
    "bg-red-300",
    "bg-orange-300",
    "bg-amber-300",
    "bg-yellow-300",
    "bg-lime-300",
    "bg-green-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-cyan-300",
    "bg-sky-300",
    "bg-blue-300",
    "bg-indigo-300",
    "bg-violet-300",
    "bg-purple-300",
    "bg-fuchsia-300",
    "bg-pink-300",
    "bg-rose-300",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);

  const handleDownload = () => {
    downloadImage(_id, photo);
  };

  const handleFullScreen = () => {
    dispatch({ type: "SET_IMGSOURCE", payload: photo });
    setIsFullScreenVisible(true);
  };

  return (
    <div className="bg-black/40 w-full p-4 text-xs text-white rounded-md backdrop-blur animate-fade-in flex flex-col justify-between absolute top-0 bottom-0">
      <div className="mb-2">
        <p className="mb-4">{prompt}</p>
        <p>
          <span
            className={`${colors[randomIndex]} text-black mr-2 px-2 py-1 rounded-full`}
          >
            {name.charAt(0)}
          </span>

          {name}
        </p>
      </div>

      <div className="w-full rounded-sm cursor-pointer flex justify-evenly items-center">
        <button onClick={handleDownload}>
          <img className="w-6 h-6" src={download} alt="download button" />
        </button>

        <button onClick={handleFullScreen}>
          <img className="w-6 h-6" src={expand} alt="fullscreen" />
        </button>
      </div>
    </div>
  );
}

export default CommunityPostOverlay;
