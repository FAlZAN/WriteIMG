import React, { useContext } from "react";
import download from "../assets/download.svg";
import expand from "../assets/expand.svg";

//global community context
import { CommunityContext } from "../context/CommunityContext";

function CommunityPostOverlay({
  name,
  prompt,
  imgUrl,
  setIsFullScreenVisible,
}) {
  const { dispatch } = useContext(CommunityContext);

  const handleFullScreen = () => {
    dispatch({ type: "SET_IMGSOURCE", payload: imgUrl });
    setIsFullScreenVisible(true);
  };

  return (
    <div className="bg-black/40 w-full text-xs text-white p-4 lg:py-8 rounded-md backdrop-blur animate-fade-in flex flex-col justify-between items-center absolute top-0 bottom-0">
      <div className="mb-2">
        <p className="mb-2">{prompt}</p>
        <h2>{name}</h2>
      </div>

      <div className="w-full rounded-sm cursor-pointer flex justify-evenly items-center">
        <a
          className="w-full flex justify-center"
          href={imgUrl}
          download={prompt}
        >
          <img className="w-6 h-6" src={download} alt="download icon" />
        </a>

        <span className="w-full flex justify-center" onClick={handleFullScreen}>
          <img className="w-6 h-6" src={expand} alt="fullscreen" />
        </span>
      </div>
    </div>
  );
}

export default CommunityPostOverlay;
