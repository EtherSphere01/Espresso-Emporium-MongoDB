import React from "react";

const Coffee = ({ coffee }) => {
  return (
    <div className="bg-base-200 transparent shadow-xl rounded-xl p-5 max-h-100 raleway-regular">
      <img
        src={coffee?.photo}
        alt={coffee?.name}
        className="w-full h-full object-center rounded-lg"
      />
      <div>
        <p className="font-semibold">
          Name: <span>{coffee.name}</span>
        </p>
        <p className="font-semibold">
          Supplier: <span>{coffee.supplier}</span>
        </p>
        <p className="font-semibold">
          Price: <span>{coffee.price}</span>
        </p>
      </div>
    </div>
  );
};

export default Coffee;
