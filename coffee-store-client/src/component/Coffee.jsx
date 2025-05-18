import React from "react";
import { Link } from "react-router";
import { MdRemoveRedEye } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Coffee = ({ coffee, onDelete }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-six-chi-85.vercel.app/delete-coffee/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
              onDelete(id); // Notify parent to remove from list
            }
          });
      }
    });
  };

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
          to={`/coffees/${coffee._id}`}
          className="flex items-center justify-center w-9 h-9 bg-[#D2B48C] rounded-sm p-2"
        >
          <MdRemoveRedEye color={"white"} />
        </Link>
        <Link
          to={`/update-coffee/${coffee._id}`}
          className="flex items-center justify-center w-9 h-9 bg-[#3C393B] rounded-sm p-2"
        >
          <IoPencil color={"white"} />
        </Link>
        <button
          onClick={() => handleDelete(coffee._id)}
          className="bg-[#EA4744] flex items-center justify-center w-9 h-9 rounded-sm p-2 hover:cursor-pointer"
        >
          <MdDelete color={"white"} />
        </button>
      </div>
    </div>
  );
};

export default Coffee;
