import React, { useState, useEffect, useRef } from "react";
import CommunityPostOverlay from "./CommunityPostOverlay";

function Card({ name, prompt, photo, setIsFullScreenVisible }) {
  const [imgUrl, setImgUrl] = useState("");
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      const image = await fetch(photo);
      const imageBlob = await image.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImgUrl(imageUrl);
    };

    fetchImg();
  }, []);

  const handleClick = () => {
    isDetailVisible === true
      ? setIsDetailVisible(false)
      : setIsDetailVisible(true);
  };

  return (
    <div
      className="rounded-md relative"
      // onClick={handleClick}
      onMouseLeave={() => setIsDetailVisible(false)}
      onMouseOver={() => {
        setIsDetailVisible(true);
      }}
    >
      <img className="rounded-md" src={photo} alt={prompt} />

      {isDetailVisible ? (
        <CommunityPostOverlay
          name={name}
          prompt={prompt}
          imgUrl={imgUrl}
          setIsFullScreenVisible={setIsFullScreenVisible}
        />
      ) : null}
    </div>
  );
}

export default Card;
