import NavBar from "../../../components/NavBar";
import ShopItem from "../../../components/ShopItem";
import appState from "../../../data/AppState";

function CartPage() {
  return (
    <>
      <NavBar />
      <section className="h-screen mt-[8vh] flex flex-col bg-accentColor bg-opacity-10">
        <h1 className="text-5xl font-bold mt-5 pl-5 md:pl-10">Your Cart</h1>
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 lg:p-10 ">
          {appState.cart.map((e, i) => {
            return <ShopItem key={i} item={e} />;
          })}
        </div>
      </section>
    </>
  );
}

export default CartPage;
