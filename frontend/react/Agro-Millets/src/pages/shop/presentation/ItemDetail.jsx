import { useParams } from "react-router-dom";
import { getItem } from "../application/shop";
import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";

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
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <img
            src="https://media.giphy.com/media/vbeNMLuswd7RR25lah/giphy.gif"
            alt=""
          />
        </div>
      ) : (
        <LoadedPage item={item} />
      )}
    </>
  );
}

function LoadedPage({ item }) {
  return (
    <>
      <section className="mt-[8vh] min-h-[92vh] w-[100%] p-6 lg:p-12 bg-slate-200">
        <div className="flex flex-col lg:flex-row">
          <img
            className="object-cover h-[50vh] lg:h-[80vh] w-[100%] lg:w-[50vw] bg-white border-slate-300 rounded-md border-4"
            src={item.images[0]}
            alt=""
          />
          <div className="flex flex-col pl-5">
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
      {item.comments.length > 0 && (
        <section className="p-12">
          <h1 className="text-3xl font-bold">Comments</h1>
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
