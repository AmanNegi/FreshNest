import { useNavigate, useParams } from "react-router-dom";
import { addComment, getItem } from "../application/shop";
import { useEffect, useState } from "react";

import NavBar from "../../../components/NavBar";
import Rating from "react-rating";
import ItemDetailShimmer from "./DetailShimmer";
import ImageView from "../../../components/ImageView";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItem(id).then((item) => {
      setLoading(false);
      setItem(item);
    });


    return () => {
      // Cleanup
    };
  }, []);

  return (
    <>
      <NavBar />
      {loading ? <ItemDetailShimmer /> : <LoadedPage item={item} />}
    </>
  );
}

function LoadedPage({ item }) {
  const [comment, setComment] = useState("");
  var navigate = useNavigate();

  return (
<>
  <section className="w-[100%] p-6">
    <div className="flex flex-col md:flex-row items-center "> {/* Added items-center for vertical alignment */}
      <ImageView
        _id={item._id}
        url={item.images[0]}
        shimmerClass={"min-h-[50vh] lg:w-[40vw]"}
            imageClass={
              "h-40  object-contain min-h-[50vh] max-h-[70vh] h-[100%] w-[100%] lg:w-[40vw] bg-white border-slate-300 rounded-md border-2 p-4 border-dashed mt-60px"
            }
      />
      <div className="flex flex-col pl-1 mt-5">
        <h1 className="text-5xl font-bold">{item.name}</h1>
        <div className="flex flex-row items-center"> {/* Added items-center for vertical alignment */}
          <h1 className="text-3xl font-light text-gray-300 line-through">
            {"$ " + (parseFloat(item.price) + 208)}
          </h1>
          <h1 className="text-4xl font-bold text-accentColor ml-3"> {/* Added margin for spacing */}
            {"$ " + item.price}
          </h1>
        </div>
        <div className="flex flex-row gap-4 mb-2 items-center"> {/* Added items-center for vertical alignment */}
          <Rating
            initialRating={4.0}
            readonly={true}
            fullSymbol={<AiFillStar className="text-amber-400" />}
            emptySymbol={<AiOutlineStar className="text-gray-300" />}
          />
          <h1 className="text-slate-500">4.5 out of 5</h1>
        </div>
        <p className="text-lg">{item.description}</p>
      </div>
    </div>
  </section>
  {/* Comments Section */}
  <h1 className="text-3xl font-bold ml-6 mt-5">User Reviews</h1> {/* Added margin for spacing */}
  <div className="flex flex-col ml-6 md:flex-row mt-3"> {/* Added margin for spacing */}
    <input
      onChange={(e) => {
        setComment(e.target.value);
      }}
      type="text"
      placeholder="Enter your review"
      className="flex-1 px-2 py-3 border-2 border-white outline-none bg-semiDarkColor bg-opacity-10 md:mr-3 focus:border-darkColor focus:rounded-lg focus:outline-none responsive-input"
    />
    <button
      className="px-5 mt-3 text-white rounded-md md:mt-0 bg-accentColor responsive-button"
      onClick={async () => {
        var res = await addComment({ comment: comment, itemID: item._id });
        if (res) {
          window.location.reload();
        } else {
          navigate("/");
        }
      }}
    >
      Comment
    </button>
  </div>

  {item.comments.length > 0 ? (
    <section className="px-5 mt-3"> {/* Added margin for spacing */}
      {item.comments.map((comment) => (
        <div key={comment._id} className="flex flex-row pt-4 pb-2 border-b border-slate-200">
          <div className="h-[25px] w-[25px] text-white p-4 rounded-full bg-lightColor flex justify-center items-center">
            <p className="">{comment.name[0]}</p>
          </div>
          <div className="flex flex-col pl-2">
            <h1 className="text-xl">{comment.content}</h1>
            <p className="text-slate-400">{comment.name}</p>
          </div>
        </div>
      ))}
    </section>
  ) : (
    <div className="h-5"></div>
  )}
</>

  );
}

export default ItemDetail;
