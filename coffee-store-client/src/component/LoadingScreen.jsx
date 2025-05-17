import React from "react";

const LoadingScreen = () => {
  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              style={{
                animation: `bounce 0.6s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
              className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg"
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
