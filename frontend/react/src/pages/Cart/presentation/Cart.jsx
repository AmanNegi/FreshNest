import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ShopItem from '../../../components/ShopItem';
import ShimmerShopItem from '../../../components/ShimmerShopItem';

import getCart from '../application/cart';
import QueryError from '../../../components/QueryError';

function CartPage() {
  const {
    isLoading,
    isError,
    error,
    data: cartItems
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart()
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <section className="md:min-h-screen mt-[14vh] flex flex-col px-[10vw]">
        <h1>Your Cart</h1>
        <div className="h-[3vh]"></div>
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8 lg:p-10 ">
          {[1, 2, 3, 4, 5, 6].map((e) => {
            return <ShimmerShopItem key={e} id={e} />;
          })}
        </div>
        <div className="h-[10vh]"></div>
      </section>
    );
  }

  if (isError) {
    return (
      <QueryError
        error={error}
        onClick={() => {
          queryClient.invalidateQueries(['cart']);
        }}
      />
    );
  }

  return (
    <>
      <main className="px-[10vw] mt-[15vh]">
        <h1>Your Cart</h1>
        <div className="h-[3vh]"></div>

        <section className="min-h-screen flex flex-col">
          {cartItems && cartItems.length === 0 && (
            <div className="h-[75vh] w-[100%] flex flex-col gap-10 justify-center items-center">
              <h1 className="text-8xl">🍉</h1>
              <h2> No Items in cart </h2>
            </div>
          )}
          <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cartItems &&
              cartItems.map((e, i) => {
                return (
                  <ShopItem
                    key={i}
                    itemId={e.item}
                    itemCount={e.count}
                    isCart={true}
                    onDelete={(item) => {
                      queryClient.setQueryData(['cart'], (prevData) => {
                        return prevData.filter((i) => i.item !== item._id);
                      });
                    }}
                  />
                );
              })}
          </div>
          <div className="h-[10vh]"></div>
        </section>
      </main>
    </>
  );
}

export default CartPage;
