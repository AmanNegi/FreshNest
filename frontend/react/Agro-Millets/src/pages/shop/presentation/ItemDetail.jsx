import { useNavigate, useParams } from "react-router-dom";
import { addComment, getItem } from "../application/shop";
import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import Loading from "../../../components/Loading";

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
      {loading ? <Loading /> : <LoadedPage item={item} />}
    </>
  );
}

function LoadedPage({ item }) {
  const [comment, setComment] = useState("");
  var navigate = useNavigate();
  return (
    <>
      <section className="mt-[8vh] min-h-[92vh] w-[100%] p-6 lg:p-12 bg-slate-200">
        <div className="flex flex-col lg:flex-row">
          <img
            className="object-cover h-[50vh] lg:h-[80vh] w-[100%] lg:w-[50vw] bg-white border-slate-300 rounded-md border-4"
            src={item.images[0]}
            alt=""
          />
          <div className="flex flex-col pl-5 mt-5 lg:mt-0">
            <h1 className="pb-2 text-5xl font-bold">{item.name}</h1>
            <div className="flex flex-row items-end">
              <h1 className="pb-5 mr-3 text-3xl font-bold line-through text-darkColor">
                {"$ " + (parseFloat(item.price) + 20)}
              </h1>

              <h1 className="pb-5 text-6xl font-bold text-accentColor">
                {"$ " + item.price}
              </h1>
            </div>

            <p className="text-lg">{item.description}</p>
          </div>
        </div>
      </section>
      {/* Comments Section */}

      <h1 className="text-3xl font-bold pl-12 pt-12">Comments</h1>
      <div className="flex flex-col md:flex-row my-5 md:0 mx-5 md:mx-12">
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          placeholder="Type comment here"
          className="bg-semiDarkColor bg-opacity-10 flex-1 py-5 md:mr-5  mt-2 border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all "
        ></input>
        <button
          className="mt-5 md:mt-0 px-5 py-2 text-white rounded-md bg-accentColor"
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

      {item.comments.length > 0 && (
        <section className="px-5 md:px-12 mb-5 md:mb-12">
          {item.comments.map((comment) => (
            // <p key={comment._id}>{comment.content}</p>
            <div
              key={comment._id}
              className="flex flex-row pt-4 pb-2 border-b border-slate-200"
            >
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
      )}
    </>
  );
}

export default ItemDetail;
