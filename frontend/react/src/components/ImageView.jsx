import React, { useState } from 'react';

import { ShimmerThumbnail } from 'react-shimmer-effects-18';
import PropTypes from 'prop-types';

const ImageView = ({ url, _id, shimmerClass, imageClass }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div id={_id}>
      <div className={`overflow-hidden ${isLoading ? shimmerClass : ''} `}>
        <div className={isLoading ? 'block' : 'hidden'}>
          <ShimmerThumbnail rounded height={400} />
        </div>
      </div>
      <div className="overflow-clip">
        <img
          className={
            `w-[100%] rounded-t-md object-contain transition-all ease-in-out duration-500 ${imageClass} ` +
            (isLoading ? 'hidden' : 'block')
          }
          src={url}
          alt=""
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

ImageView.propTypes = {
  url: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  shimmerClass: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired
};

export default ImageView;
