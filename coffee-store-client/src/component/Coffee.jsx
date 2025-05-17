import React from "react";
import { Link } from "react-router";
import { MdRemoveRedEye } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Coffee = ({ coffee }) => {
  return (
    <div className="bg-base-200 transparent rounded-xl p-5 raleway-regular flex items-center justify-between container">
      <div>
        <img
          src={coffee?.photo}
          alt={coffee?.name}
          className="w-50 h-60 object-center rounded-lg"
        />
      </div>
      <div>
        <p className="font-semibold">
          Name: <span className="text-accent font-medium">{coffee.name}</span>
        </p>
        <p className="font-semibold">
          Supplier:{" "}
          <span className="text-accent font-medium">{coffee.supplier}</span>
        </p>
        <p className="font-semibold">
          Price: <span className="text-accent font-medium">{coffee.price}</span>
        </p>
      </div>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <Link
          to={`/details/${coffee._id}`}
          className="flex items-center justify-center w-9 h-9 bg-[#D2B48C] rounded-sm p-2"
        >
          <MdRemoveRedEye color={"white"} />
        </Link>
        <Link
          to={`/edit/${coffee._id}`}
          className="flex items-center justify-center w-9 h-9 bg-[#3C393B] rounded-sm p-2"
        >
          <IoPencil color={"white"} />
        </Link>
        <button className="bg-[#EA4744] flex items-center justify-center w-9 h-9 rounded-sm p-2 hover:cursor-pointer">
          <MdDelete color={"white"} />
        </button>
      </div>
    </div>
  );
};

export default Coffee;
