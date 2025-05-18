import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState(null);

  useEffect(() => {
    fetch(`https://coffee-store-server-six-chi-85.vercel.app/coffees/${id}`)
      .then((res) => res.json())
      .then((data) => setCoffee(data));
  }, [id]);

  const handleUpdateCoffee = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(
      `https://coffee-store-server-six-chi-85.vercel.app/update-coffee/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          Swal.fire({
            title: "Coffee Updated Successfully!",
            icon: "success",
          });
          navigate("/");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update failed!",
        });
      });
  };

  if (!coffee) return <div className="text-center p-10">Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: "url('/public/resources/images/more/11.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto py-10 px-2 md:px-0 rancho-regular text-xl">
        <Link
          to="/"
          className="flex gap-2 items-center w-40 hover:bg-primary p-3 hover:p-3 hover:rounded-xl"
        >
          <FaArrowLeft size={"15"} />
          <h1>Back to home</h1>
        </Link>
      </div>
      <div className="p-10 bg-[#F4F3F0] container mx-auto">
        <div className="text-center space-y-5">
          <h1 className="rancho-regular text-4xl">Update Coffee</h1>
          <p className="md:w-4/5 text-center mx-auto text-accent">
            Update the coffee details below. You can change the image too.
          </p>
        </div>
        <div className="mt-10 raleway-regular text-black font-semibold">
          <form onSubmit={handleUpdateCoffee} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
              <div>
                <label htmlFor="name">Coffee Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={coffee.name}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={coffee.price}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="supplier">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  defaultValue={coffee.supplier}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="taste">Taste</label>
                <input
                  type="text"
                  name="taste"
                  defaultValue={coffee.taste}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={coffee.category}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="details">Details</label>
                <input
                  type="text"
                  name="details"
                  defaultValue={coffee.details}
                  className="input input-bordered w-full mt-2"
                  required
                />
              </div>
            </div>
            <div className="mt-5 md:mt-10">
              <label htmlFor="photo">New Photo (optional)</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="file-input file-input-bordered w-full mt-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-5 md:mt-10 w-full text-black rancho-regular text-xl hover:bg-[#F4F3F0]"
            >
              Update Coffee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoffee;
