import { ShimmerThumbnail, ShimmerTitle, ShimmerText } from 'react-shimmer-effects-18';

function ItemDetailShimmer() {
  return (
    <>
      <section className="mt-[8vh] min-h-[52vh] w-[100%] p-6 lg:p-12 ">
        <div className="flex flex-col lg:flex-row">
          <div className="overflow-hidden h-[100%]">
            <div className="min-h-[50vh] max-h-[70vh] h-[100%] w-[100%] lg:w-[40vw] bg-white border-slate-300 rounded-md overflow-hidden">
              <ShimmerThumbnail height={600} rounded />
            </div>
          </div>
          <div className="flex flex-col w-[50%] pl-8 mt-5 lg:mt-0">
            <ShimmerTitle line={2} gap={10} />
            <ShimmerText line={4} gap={10} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemDetailShimmer;
