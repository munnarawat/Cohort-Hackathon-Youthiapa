import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
        <span className="text-lg font-semibold text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;