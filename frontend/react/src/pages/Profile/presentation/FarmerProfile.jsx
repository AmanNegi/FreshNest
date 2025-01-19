import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../../components/Loading';
import QueryError from '../../../components/QueryError';

import male from '../../../assets/icons/male.svg';
import './pattern.css';
import { getAllFarmerItems, getUserFromId } from '../../shop/application/shop';
import ShopItem from '../../../components/ShopItem';
import { useEffect } from 'react';

function FarmProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const user = await getUserFromId(id);
      if (!user) throw Error('An error occured while loading user!');

      const farmItems = await getAllFarmerItems(user._id);
      if (!farmItems) {
        console.warn('An error occured while loading farm items');
      }

      return { user, farmItems };
    }
  });

  const pattern = 'pattern1';

  if (isLoading) {
    return (
      <main className="min-h-[100vh]">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[100vh]">
        <QueryError
          error={error}
          onClick={() => {
            queryClient.invalidateQueries(['profile']);
          }}
        />
      </main>
    );
  }

  const { user, farmItems } = data;

  return (
    <>
      <main className="min-h-[100vh]">
        <div
          className={`mt-[8vh] h-[20vh] w-full ${user?.pattern ? user?.pattern : pattern}`}
        ></div>
        <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
          <img className="h-[100px] w-[100px]" src={male} alt="" />
        </div>

        <section className="flex flex-col items-center mt-20 ">
          {user._id !== undefined ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="badge badge-accent text-white p-3">
                  {user.userType === undefined ? '' : user.userType.toUpperCase()}
                </div>
              </div>
              <h6 className="text-slate-700">{user.email}</h6>
              {user.phone && <h6>{`+91 ${user.phone}`}</h6>}
            </>
          ) : (
            <>
              <h1>Currently not logged in</h1>
              <button
                onClick={async () => {
                  navigate('/auth');
                }}
                className="bg-lightColor  rounded-lg text-white font-semibold text-md  py-2 px-10 mt-5"
              >
                Login
              </button>
            </>
          )}
        </section>

        <div className="h-[3vh]"></div>

        {isLoading && (
          <section className="mt-[10vh] h-[40vh] mb-[8vh] flex flex-col items-center justify-center">
            <Loading />
          </section>
        )}
        <section className="min-h-[40vh] mb-[8vh] w-[100%]">
          <h1 className="mb-5 mx-20">Farm Images</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw] mx-20 ">
            {user &&
              user.images.map((e, i) => {
                return (
                  <img
                    className="w-full rounded-md hover:scale-[1.025] transition-all duration-500 h-[35vh] object-cover"
                    key={i + e}
                    src={e}
                  />
                );
              })}
          </div>
        </section>

        <section className="w-full">
          <h1 className="mb-5 mx-20">Farm Items</h1>
          <section className="w-[100%] min-h-screen">
            <div className="px-20 w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {farmItems &&
                farmItems.map((e) => {
                  return (
                    <ShopItem
                      key={e._id}
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
        </section>
      </main>
    </>
  );
}

export default FarmProfile;
