import React from "react";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen rancho-regular relative"
        style={{
          backgroundImage: "url(/resources/images/more/3.png)",
        }}
      >
        {/* Remove or comment out this overlay if you don't want transparency */}
        {/* <div className="hero-overlay"></div> */}

        <div
          className="
            absolute top-1/2 left-1/2
            -translate-y-1/2 
            -translate-x-1/2
            w-11/12 sm:w-3/4 md:w-1/2
            text-left
            sm:left-1/2 sm:-translate-x-1/2
            left-0
            px-4
            sm:px-0
            sm:translate-x-0
            text-white
          "
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-5 text-4xl sm:text-5xl font-bold">
            Would you like a Cup of Delicious Coffee?
          </h1>
          <p className="mb-5 text-lg sm:text-2xl">
            It's coffee time - Sip & Savor - Relaxation in every sip! Get the
            nostalgia back!! Your companion of every moment!!! Enjoy the
            beautiful moments and make them memorable.
          </p>
          <button className="btn shadow-none border-none bg-[#E3B577] text-xl">
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-[#ECEAE3] w-full py-10">
        <div className="container mx-auto flex flex-col md:flex-row px-2 md:px-0 items-center justify-between h-full gap-6 ">
          <div className="space-y-3">
            <img src="/resources/images/icons/1.png" alt="" />
            <h1 className="text-3xl font-bold rancho-regular ">
              Awesome Aroma
            </h1>
            <p className="text-sm raleway-regular">
              You will definitely be a fan of the design & aroma of your coffee
            </p>
          </div>

          <div className="space-y-3">
            <img src="/resources/images/icons/2.png" alt="" />
            <h1 className="text-3xl font-bold rancho-regular ">High Quality</h1>
            <p className="text-sm raleway-regular">
              We served the coffee to you maintaining the best quality
            </p>
          </div>

          <div className="space-y-3">
            <img src="/resources/images/icons/3.png" alt="" />
            <h1 className="text-3xl font-bold rancho-regular ">Pure Grades</h1>
            <p className="text-sm raleway-regular">
              The coffee is made of the green coffee beans which you will love
            </p>
          </div>

          <div className="space-y-3">
            <img src="/resources/images/icons/4.png" alt="" />
            <h1 className="text-3xl font-bold rancho-regular ">
              Proper Roasting
            </h1>
            <p className="text-sm raleway-regular">
              Your coffee is brewed by first roasting the green coffee beans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
