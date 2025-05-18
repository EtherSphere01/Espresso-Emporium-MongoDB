import React, { useEffect, useState } from "react";
import Coffee from "./Coffee";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router"; // ✅ Fixed import

const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://coffee-store-server-six-chi-85.vercel.app/coffees")
      .then((res) => res.json())
      .then((data) => {
        setCoffees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coffees:", error);
        setLoading(false);
      });
  }, []);

  // ✅ Handler to remove a deleted coffee from state
  const handleDeleteCoffee = (id) => {
    setCoffees((prevCoffees) =>
      prevCoffees.filter((coffee) => coffee._id !== id)
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="py-10 relative">
      {/* Top-layer background image */}
      <div className="absolute top-10 left-0 w-full z-10 pointer-events-none">
        <img
          src="/public/resources/images/more/1.png"
          alt="Decorative Overlay"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Main content */}
      <div className="relative z-0">
        <div className="container mx-auto">
          <div className="text-center space-y-5">
            <h3 className="raleway-regular">--- Sip & Savor ---</h3>
            <h1 className="rancho-regular text-4xl">Our Popular Products</h1>
            <Link
              to="/add-coffee"
              className="bg-secondary border-2 border-black py-2 px-5 rounded-md rancho-regular text-white hover:text-black hover:bg-white flex items-center justify-center gap-2 w-40 mx-auto text-xl"
            >
              Add Coffee
              <img
                src="/public/resources/images/icons/1.png"
                className="w-5 h-5"
                alt=""
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {coffees.map((coffee) => (
              <Coffee
                key={coffee._id}
                coffee={coffee}
                onDelete={handleDeleteCoffee}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeList;
