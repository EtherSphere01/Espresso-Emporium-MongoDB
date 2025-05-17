import React, { useEffect, useState } from "react";
import Coffee from "./Coffee";
import LoadingScreen from "./LoadingScreen";

const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/coffees")
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

  if (loading) return <LoadingScreen></LoadingScreen>;

  return (
    <div className="coffee-list container mx-auto p-5">
      {coffees.length === 0 && <p>No coffees found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {coffees.map((coffee) => (
          <Coffee key={coffee._id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default CoffeeList;
