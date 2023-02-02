import React, { useState } from "react";
import CommunityPostOverlay from "./CommunityPostOverlay";

function Card({ _id, name, prompt, photo, setIsFullScreenVisible }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleMouseOver = () => {
    setIsDetailVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDetailVisible(false);
  };

  return (
    <div
      className="rounded-md relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="rounded-md" src={photo} alt={prompt} />

      {isDetailVisible && (
        <CommunityPostOverlay
          _id={_id}
          name={name}
          prompt={prompt}
          photo={photo}
          setIsFullScreenVisible={setIsFullScreenVisible}
        />
      )}
    </div>
  );
}

export default Card;
