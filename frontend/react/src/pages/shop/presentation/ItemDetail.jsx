import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Rating from 'react-rating';

import { addComment, getItem, getUserFromId } from '../application/shop';
import ItemDetailShimmer from './DetailShimmer';
import ImageView from '../../../components/ImageView';

import { toast } from 'react-toastify';
import appState from '../../../data/AppState';
import QueryError from '../../../components/QueryError';

import { Star, StarOff } from 'lucide-react';
function ItemDetail() {
  const { id } = useParams();

  /**
   * @type {[Item, function]}
   */
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const commentRef = useRef();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const item = await getItem(id);

      if (!item) throw Error('An error occured while loading item!');

      const user = await getUserFromId(item?.listedBy);

      if (!user) throw Error('An error occured while loading item!');

      return {
        item,
        user
      };
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return addComment({
        comment: commentRef.current.value,
        itemID: id
      });
    },
    onSuccess: (data) => {
      // Manually, update the cache as comment is added
      queryClient.setQueryData(['item', id], () => {
        return data;
      });
    }
  });

  if (isLoading) return <ItemDetailShimmer />;
  if (isError) {
    return (
      <QueryError
        error={error}
        onClick={() => {
          queryClient.invalidateQueries(['item', id]);
        }}
      />
    );
  }
  const { item, user: lister } = data;
  return (
    <>
      <main className="px-[10vw] pt-[8vh]">
        <section className="mt-[8vh] min-h-[52vh] w-[100%] ">
          <div className="flex flex-col lg:flex-row">
            <ImageView
              _id={item._id}
              url={item.images[0]}
              shimmerClass={'min-h-[50vh] lg:w-[40vw]'}
              imageClass={
                'h-40 object-cover min-h-[50vh] max-h-[70vh] h-[100%] w-[100%] lg:w-[40vw] bg-white border-slate-300 rounded-md border-2 p-4 border-dashed'
              }
            />
            <div className="flex flex-col pl-8 mt-5 lg:mt-0">
              <h1 className="pb-2 text-3xl font-bold">{item.name}</h1>

              {appState.userData._id != lister._id && (
                <p
                  onClick={() => {
                    navigate('/profile/' + lister._id);
                  }}
                  className="cursor-pointer bg-accentColor text-white rounded-full py-2 w-[10vw] items-center justify-center flex "
                >
                  By: {lister.name}
                </p>
              )}
              <div className="flex flex-row items-end">
                <h1 className="pb-5 mr-3 text-xl font-light text-gray-300 line-through">
                  {'₹ ' + (parseFloat(item.price) + 20).toFixed(2)}
                </h1>

                <h1 className="pb-5 text-2xl font-bold text-accentColor">
                  {'₹ ' + item.price.toFixed(2)}
                </h1>
              </div>

              <div className="flex flex-row gap-4 mb-2 items-center">
                <Rating
                  initialRating={4.0}
                  readonly={true}
                  fullSymbol={<Star className="text-amber-400" />}
                  emptySymbol={<StarOff className="text-gray-300" />}
                />
                <h6 className="text-slate-500">4.5 out of 5</h6>
              </div>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        </section>
        {/* Comments Section */}

        <h1 className="text-3xl font-bold mt-[5vh]">User Reviews</h1>
        <div className="flex flex-col md:flex-row justify-center items-center h-[14vh]">
          <input
            ref={commentRef}
            type="text"
            placeholder="Enter your review"
            className="input input-bordered w-full md:mr-5 px-2 py-5"
          ></input>
          <button
            className="px-5 h-[7vh] w-full md:w-auto mt-2 md:mt-0 text-white rounded-md bg-accentColor"
            onClick={async () => {
              if (!appState.isLoggedIn) {
                navigate('/auth');
                return;
              }

              if (commentRef.current.value.length === 0) {
                toast.error('Please enter a comment');
                return;
              }

              mutation.mutate();
            }}
          >
            Comment
          </button>
        </div>

        {item.comments.length > 0 ? (
          <section className="px-5 mb-5 md:px-12 md:mb-12">
            {item.comments.map((comment) => (
              <div key={comment._id} className="flex flex-row pt-4 pb-2 border-b border-slate-200">
                <div className="h-[25px] w-[25px] text-white p-4 rounded-full bg-lightColor flex justify-center items-center">
                  <p className="">{comment.name[0]}</p>
                </div>
                <div className="flex flex-col pl-2">
                  <h3 className="text-xl">{comment.content}</h3>
                  <p className="">{comment.name}</p>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="h-5"></div>
        )}
      </main>
    </>
  );
}

export default ItemDetail;
