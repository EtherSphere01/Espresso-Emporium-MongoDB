import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import LoadingScreen from "./LoadingScreen";
import { FaArrowLeft } from "react-icons/fa6";

const CoffeeDetails = () => {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/coffees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoffee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coffee:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }

  if (!coffee) {
    return <div className="text-center mt-20">Coffee not found</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="container mx-auto py-10 px-2 md:px-0 rancho-regular text-xl ">
        <Link
          to="/"
          className="flex gap-2 items-center w-40 hover:bg-primary p-3 hover:p-3 hover:rounded-xl "
        >
          <FaArrowLeft size={"15"} />
          <h1>Back to home</h1>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={coffee.photo}
          alt={coffee.name}
          className="w-full md:w-80 h-auto rounded-lg"
        />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold rancho-regular">{coffee.name}</h1>
          <p>
            <strong>Chef:</strong> {coffee.chef || "Unknown"}
          </p>
          <p>
            <strong>Price:</strong> ${coffee.price}
          </p>
          <p>
            <strong>Supplier:</strong> {coffee.supplier}
          </p>
          <p>
            <strong>Taste:</strong> {coffee.taste}
          </p>
          <p>
            <strong>Category:</strong> {coffee.category}
          </p>
          <p>
            <strong>Details:</strong> {coffee.details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
