import { useState } from 'react';
import Loading from '../../../components/Loading';
import search from '../application/search';
import { toast } from 'react-toastify';
import ShopItem from '../../../components/ShopItem';
import PropTypes from 'prop-types';

function Search() {
  const [loading, setLoading] = useState(false);
  /**
   * @type {[Item[]|null, function]}
   */
  const [items, setItems] = useState(null);
  const [query, setQuery] = useState('');

  const searchForQuery = async () => {
    setLoading(true);
    if (query.length >= 3 && query) {
      const data = await search(query);
      setLoading(false);
      setItems(data);
      return;
    }
    setLoading(false);
    toast.info('Enter atleast 3 characters to search');
  };

  return (
    <>
      <section className="mt-[8vh] min-h-[100vh]">
        <div className="flex flex-row lg:mx-16 p-5 items-center">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchForQuery();
              }
            }}
            autoFocus={true}
            type="text"
            placeholder="Enter your query"
            className="input input-bordered w-full  mr-3 py-3 px-2"
          ></input>
          <button onClick={() => searchForQuery()} className="btn btn-accent px-4">
            Search
          </button>
        </div>

        {items != null ? (
          loading ? (
            <Loading />
          ) : (
            <LoadedPage items={items} />
          )
        ) : (
          <div className="h-[50vh] flex flex-col justify-center items-center">
            <p className="text-5xl mb-2">😵</p>
            <h2>Enter a valid query</h2>
          </div>
        )}
      </section>
    </>
  );
}

function LoadedPage({ items }) {
  return (
    <>
      <section className=" min-h-[92vh] w-[100%] p-6 lg:px-24 ">
        <h1 className="text-3xl font-bold">{items.length > 0 ? 'Results' : 'No Results'}</h1>
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  mt-5">
          {items.map((e) => (
            <ShopItem key={e._id} itemId={e._id} />
          ))}
        </div>
      </section>
    </>
  );
}

LoadedPage.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Search;
