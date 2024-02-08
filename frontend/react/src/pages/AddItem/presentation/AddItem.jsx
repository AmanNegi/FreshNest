import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import appState from "../../../data/AppState";

import { toast } from "react-toastify";
import { addItem } from "../application/functions";
import { useQueryClient } from "@tanstack/react-query";

const AddItem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const [data, setData] = useState({
    name: "",
    description: "",
    file: "",
    price: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);

      setData({ ...data, latitude: crd.latitude, longitude: crd.longitude });
    }

    function errors(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            toast.error("Please grant the location permission to continue");
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

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

    // validate input
    if (data.name.length === 0) {
      toast.error("Enter a name for the product");
      return;
    }
    if (data.description.length === 0) {
      toast.error("Enter a description for the product");
      return;
    }
    if (data.price.length === 0) {
      toast.error("Enter a price for the product");
      return;
    }
    if (data.file.length === 0) {
      toast.error("Upload a picture for the product");
      return;
    }

    if (data.longitude === "" || data.latitude === "") {
      toast.error("Location not found, try again!");
      return;
    }

    setIsLoading(true);

    const newData = {
      listedBy: appState.userData._id,
      name: data.name,
      description: data.description,
      price: data.price,
      file: data.file,
      latitude: data.latitude,
      longitude: data.longitude,
    };
    console.log(newData);
    const res = await addItem(newData);
    setIsLoading(false);

    if (res) {
      // add this data to the cache (react query)
      queryClient.setQueryData(["items"], (oldData) => {
        return [newData, ...oldData];
      });
      navigate("/shop");
    }
  };

  return (
    <main className={isLoading ? "pointer-events-none" : ""}>
      <section className="h-[100vh] w-full mt-[8vh] py-14 px-14 md:px-40">
        <h1>Add Item</h1>
        <div className="flex flex-row gap-2 mb-4">
          <div className="mt-4 badge badge-ghost p-4">
            Latitude: {data.latitude}
          </div>
          <div className="mt-4 badge badge-ghost p-4">
            Longitude: {data.longitude}
          </div>
        </div>

        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            className="input input-bordered w-full mt-2"
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
          <div className="h-4"></div>
          <label htmlFor="description">Product Description</label>
          <input
            className="input input-bordered w-full mt-2"
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
          />

          <div className="h-4"></div>
          <label htmlFor="price">Price</label>
          <input
            className="input input-bordered w-full mt-2"
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
            name="image"
            id="image"
            onChange={handleImageChange}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />

          <button className="myButton mt-10 ">
            {isLoading ? (
              <span className="mx-10 loading loading-dots text-white" />
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddItem;
