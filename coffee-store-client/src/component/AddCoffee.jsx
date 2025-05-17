import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router"; // <-- FIXED import
import Swal from "sweetalert2";

const AddCoffee = () => {
  const handleAddCoffee = (event) => {
    event.preventDefault(); // <-- Prevent default form submit reload

    const form = event.target;
    const formData = new FormData(form);

    fetch("http://localhost:3000/add-coffee", {
      method: "POST",
      body: formData, // Do NOT set Content-Type manually with FormData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Coffee Added Successfully!",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url('public/resources/images/more/11.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto py-10 px-2 md:px-0 rancho-regular text-xl ">
        <Link
          to="/"
          className="flex gap-2 items-center w-40 hover:bg-primary p-3 hover:p-3 hover:rounded-xl "
        >
          <FaArrowLeft size={"15"} />
          <h1>Back to home</h1>
        </Link>
      </div>
      <div className="p-10 bg-[#F4F3F0] container mx-auto">
        <div className="text-center space-y-5">
          <h1 className="rancho-regular text-4xl ">Add New Coffee</h1>
          <p className="md:w-4/5 text-center mx-auto text-accent">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="mt-10 raleway-regular text-black font-semibold">
          <form onSubmit={handleAddCoffee} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
              <div className="raleway-regular ">
                <label htmlFor="name" className="font-semibold">
                  Coffee Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Coffee Name"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="font-semibold ">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Coffee Price"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="supplier" className="font-semibold">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  placeholder="Enter Coffee Supplier"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="taste" className="font-semibold">
                  Taste
                </label>
                <input
                  type="text"
                  name="taste"
                  placeholder="Enter Coffee Taste"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="font-semibold">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter Coffee Category"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="details" className="font-semibold">
                  Details
                </label>
                <input
                  type="text"
                  name="details"
                  placeholder="Enter Coffee Details"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
            </div>
            <div className="mt-5 md:mt-10">
              <label htmlFor="photo" className="font-semibold ">
                Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="file-input file-input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-5 md:mt-10 w-full text-black rancho-regular text-xl hover:bg-[#F4F3F0]"
            >
              Add Coffee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoffee;
