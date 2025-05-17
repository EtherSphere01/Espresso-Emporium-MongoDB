import React from "react";

const Header = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/resources/images/more/15.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-20 flex items-center justify-center gap-5"
    >
      <img src="/public/resources/images/more/logo1.png" alt="" className="h-15 w-15"/>
      <h1 className="rancho-regular text-white text-4xl">Espresso Emporium</h1>
    </div>
  );
};

export default Header;
