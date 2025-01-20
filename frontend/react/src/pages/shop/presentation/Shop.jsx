import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ShopItem from '../../../components/ShopItem';
import NavigationButton from '../../../components/Button';
import ShimmerShopItem from '../../../components/ShimmerShopItem';

import appState from '../../../data/AppState';
import getItems, { sortList } from '../application/shop';

import { ChevronDown } from 'lucide-react';

import QueryError from '../../../components/QueryError';
import PropTypes from 'prop-types';

function Shop() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['items'],
    queryFn: () => getItems(searchParams.get('sort') || '0')
  });

  const [urlFilter, setUrlFilter] = useState(parseInt(searchParams.get('sort')) || '0');

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  if (isError) {
    return (
      <QueryError
        error={error}
        onClick={() => {
          queryClient.invalidateQueries(['items']);
        }}
      />
    );
  }

  return (
    <>
      <main className="px-[10vw] mt-[14vh]">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-3xl font-semibold mr-auto">{getShopHeading()}</h1>
          <div className="flex flex-row items-center">
            {!isError && !isLoading && <Filter filter={urlFilter} updateFilter={updateFilter} />}
            {appState.isFarmer() && (
              <NavigationButton path="/add" text="Add Item" additionalClasses="ml-2" />
            )}
          </div>
        </div>

        <div className="h-[3vh]"></div>

        {isLoading ? (
          <section className="w-full bg-white min-h-screen mb-8">
            <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[1, 2, 3, 4, 5, 6].map((e) => {
                return <ShimmerShopItem key={e} id={e} />;
              })}
            </div>
          </section>
        ) : (
          <section className="w-[100%] min-h-screen">
            <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {data &&
                data.map((e) => {
                  return (
                    <ShopItem
                      key={e._id}
                      itemCount={0} //TODO: fix this behaviour
                      itemId={e._id}
                      isCart={false}
                      onDelete={(item) => {
                        queryClient.setQueryData(['items'], (prevData) => {
                          return prevData.filter((i) => i._id !== item._id);
                        });
                      }}
                    />
                  );
                })}
            </div>
          </section>
        )}
      </main>
    </>
  );

  function updateFilter(value) {
    // Manually update the cache, in case of a sort mode change
    queryClient.setQueryData(['items'], (prevData) => {
      return sortList(prevData, value);
    });
    navigate(`?sort=${value}`);
    setUrlFilter(value);
  }
}

function getShopHeading() {
  if (appState.isFarmer()) return 'Your Products';
  else if (appState.isAdmin()) return 'All Products';

  return 'Explore Products';
}

/**
 * Build the Filter Dropdown
 * @param {object} props
 * @param {number} props.filter
 * @param {(string)=>void} props.updateFilter
 * @returns
 */
const Filter = ({ filter, updateFilter }) => {
  return (
    <details className="dropdown dropdown-end">
      <summary className="m-1 btn">
        {options[filter].label}
        <ChevronDown />
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {options.map((e, i) => {
          return (
            <li key={i} onClick={() => updateFilter(e.value)}>
              <option className="border-none" key={i} value={e.value}>
                {e.label}
              </option>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired
};

const options = [
  { value: '0', label: 'Latest' },
  { value: '1', label: 'Oldest' },
  { value: '2', label: 'A-Z' },
  { value: '3', label: 'Z-A' },
  { value: '4', label: 'Price: Low to High' },
  { value: '5', label: 'Price: High to Low' }
];

export default Shop;
