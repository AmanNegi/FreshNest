import React from 'react';
import { ShimmerThumbnail, ShimmerTitle, ShimmerText } from 'react-shimmer-effects-18';
import PropTypes from 'prop-types';

const ShimmerShopItem = ({ id }) => {
  return (
    <div
      key={id}
      className="border border-slate-300 relative transition duration-500 rounded-sm hover:shadow-m d bg-white "
    >
      <div className="h-[30vh] w-[100%] relative">
        <ShimmerThumbnail rounded />
      </div>

      <div className="px-4 py-2  rounded-lg ">
        <ShimmerTitle line={1} gap={10} variant="primary" />
        <ShimmerText line={2} gap={10} />
      </div>
    </div>
  );
};

ShimmerShopItem.propTypes = {
  id: PropTypes.any.isRequired
};

export default ShimmerShopItem;
