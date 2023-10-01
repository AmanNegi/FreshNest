import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../../components/NavBar";
import { addItem } from "../application/functions";
import appState from "../../../data/AppState";

const AddItem = () => {
  var navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    file: "",
    price: "",
  });

  /**
   * Update state on input change
   * @param {React.ChangeEventHandler<HTMLInputElement>} e
   */
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Update state on image change
   * @param {React.ChangeEventHandler<HTMLInputElement>} e
   */
  const handleImageChange = (e) => {
    setData({
      ...data,
      file: e.target.files[0],
    });
  };

  /**
   * Adds item to the backend
   * @param {React.FormEventHandler<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addItem({
      listedBy: appState.userData._id,
      name: data.name,
      description: data.description,
      price: data.price,
      file: data.file,
    });

    if (res) {
      navigate("/shop");
    }
  };

  return (
    <main>
      <NavBar />
      <section className="h-[100vh] w-full mt-[8vh] p-20">
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            className="inputStyle"
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
          <div className="h-4"></div>
          <label htmlFor="description">Product Description</label>
          <input
            className="inputStyle"
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
          />

          <div className="h-4"></div>
          <label htmlFor="price">Price</label>
          <input
            className="inputStyle"
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleInputChange}
          />
          <div className="h-4"></div>

          <label htmlFor="image">Product Image</label>
          <div className="h-2"></div>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          <button className="myButton mt-10">Add Item</button>
        </form>
      </section>
    </main>
  );
};

export default AddItem;
