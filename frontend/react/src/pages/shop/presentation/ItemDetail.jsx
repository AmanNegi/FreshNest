import { useNavigate, useParams } from "react-router-dom";
import { addComment, getItem } from "../application/shop";
import { useEffect, useState } from "react";

import NavBar from "../../../components/NavBar";
import Rating from "react-rating";
import ItemDetailShimmer from "./DetailShimmer";
import ImageView from "../../../components/ImageView";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Item } from "../application/shop_model";

function ItemDetail() {
  const { id } = useParams();

  /**
   * @type {[Item, function]}
   */
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItem(id).then((item) => {
      setLoading(false);
      if (item) {
        setItem(item);
      }
    });

    return () => {
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
      <section className="mt-[8vh] min-h-[52vh] w-[100%] p-6 lg:p-12 ">
        <div className="flex flex-col lg:flex-row">
          <ImageView
            _id={item._id}
            url={item.images[0]}
            shimmerClass={"min-h-[50vh] lg:w-[40vw]"}
            imageClass={
              "h-40 object-contain min-h-[50vh] max-h-[70vh] h-[100%] w-[100%] lg:w-[40vw] bg-white border-slate-300 rounded-md border-2 p-4 border-dashed"
            }
          />
          <div className="flex flex-col pl-8 mt-5 lg:mt-0">
            <h1 className="pb-2 text-5xl font-bold">{item.name}</h1>
            <div className="flex flex-row items-end">
              <h1 className="pb-5 mr-3 text-3xl font-light text-gray-300 line-through">
                {"₹ " + (parseFloat(item.price) + 20)}
              </h1>

              <h1 className="pb-5 text-4xl font-bold text-accentColor">
                {"₹ " + item.price}
              </h1>
            </div>

            <div className="flex flex-row gap-4 mb-2 items-center">
              <Rating
                initialRating={4.0}
                readonly={true}
                fullSymbol={<AiFillStar className="text-amber-400" />}
                emptySymbol={<AiOutlineStar className="text-gray-300" />}
              />
              <h6 className="text-slate-500">4.5 out of 5</h6>
            </div>
            <p className="text-lg">{item.description}</p>
          </div>
        </div>
      </section>
      {/* Comments Section */}

      <h1 className="pl-12 text-3xl font-bold ">User Reviews</h1>
      <div className="flex flex-col md:flex-row justify-center items-center h-[14vh] mx-5 md:mx-12">
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          placeholder="Enter your review"
          className="input input-bordered w-full md:mr-5 px-2 py-5"
        ></input>
        <button
          className="px-5 h-[7vh] w-full md:w-auto mt-2 md:mt-0 text-white rounded-md bg-accentColor"
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
        <section className="px-5 mb-5 md:px-12 md:mb-12">
          {item.comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-row pt-4 pb-2 border-b border-slate-200"
            >
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
    </>
  );
}

export default ItemDetail;
