import NavBar from "../../../components/NavBar";

function About() {
  return (
    <>
      <NavBar />
      <section className=" mt-[8vh] p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-5">About Agro-Millets</h1>
        <p className="p-5">
          AgroMillets is an online platform that connects farmers who produce
          grains and millets with customers who want to buy them directly. By
          eliminating intermediaries and providing a direct connection between
          farmers and customers, AgroMillets makes it easier for farmers to sell
          their products and for customers to find fresh and high-quality grains
          and millets at lower prices. The platform provides secure payment
          options, shipping services, and customer service to ensure safe and
          efficient transactions. With AgroMillets, farmers can expand their
          customer base and customers can support sustainable farming practices
          while enjoying a wider variety of products.
        </p>
        <a
          target="_blank"
          className="text-accentColor hover:text-lightColor underline text-lg"
          href="https://github.com/AmanNegi/AgroMillets"
        >
          View the project on GitHub
        </a>
      </section>
    </>
  );
}

export default About;
