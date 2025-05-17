import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/public/resources/images/more/13.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full mt-10"
    >
      <div className="container mx-auto p-20 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="space-y-6">
          <img
            src="/public/resources/images/more/logo1.png"
            alt=""
            className="h-15 w-15"
          />
          <h1 className="rancho-regular text-black text-4xl">
            Espresso Emporium
          </h1>
          <p className="raleway-regular">
            Always ready to be your friend. Come & Contact with us to share your
            memorable moments, to share with your best companion.
          </p>
          <div className="flex">
            <FaFacebookSquare className="text-3xl mr-5" />
            <FaInstagramSquare className="text-3xl mr-5" />
            <FaTwitterSquare className="text-3xl mr-5" />
            <FaLinkedin className="text-3xl mr-5" />
          </div>
          <h1 className="rancho-regular text-black text-3xl">Get in Touch</h1>
          <p className="flex items-center gap-2 ">
            <FaPhone></FaPhone>
            <span className="raleway-regular">+8801577827590</span>
          </p>
          <p className="flex items-center gap-2 ">
            <BiSolidMessageDetail></BiSolidMessageDetail>
            <span className="raleway-regular">info@gmail.com</span>
          </p>
          <p className="flex items-center gap-2 ">
            <FaLocationDot></FaLocationDot>
            <span className="raleway-regular">
              72, Wall street, King Road, Dhaka
            </span>
          </p>
        </div>

        {/*right sid ************************** */}

        <div>
          <h1 className="rancho-regular text-black text-3xl py-5">
            Contact with Us
          </h1>

          <form>
            <div className="grid grid-cols-1 gap-5">
              <div className="raleway-regular ">
                <label htmlFor="name" className="font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold ">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="font-semibold">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Enter Your Message"
                  className="input input-bordered w-full focus:border-[#D2B48C] focus:shadow-2xl focus:border-2 focus:outline-none mt-2"
                  required
                />
              </div>
            </div>
            <button className="mt-3 py-1 px-3 rancho-regular border-1 border-black rounded-3xl">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url('/public/resources/images/more/24.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="rancho-regular text-white text-center py-3">
          Copyright Espresso Emporium ! All Rights Reserved
        </h2>
      </div>
    </div>
  );
};

export default Footer;
