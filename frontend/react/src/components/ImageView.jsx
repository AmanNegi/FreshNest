import React, { useState } from "react";

import { ShimmerThumbnail } from "react-shimmer-effects-18";

const ImageView = ({ url, _id, shimmerClass, imageClass }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div id={_id}>
      <div className={`overflow-hidden ${isLoading ? shimmerClass : ""} `}>
        <div className={isLoading ? "block" : "hidden"}>
          <ShimmerThumbnail rounded height={400} />
        </div>
      </div>

      <div className="overflow-clip">
        <img
          className={
            `w-[100%] rounded-t-lg object-cover hover:scale-110 transition-all ease-in-out duration-500 ${imageClass} ` +
            (isLoading ? "hidden" : "block")
          }
          src={url}
          alt=""
          onLoad={() => {
            console.log("Image has loaded");
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default ImageView;
