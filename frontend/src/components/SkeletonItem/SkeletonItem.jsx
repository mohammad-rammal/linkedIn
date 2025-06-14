import React from "react";

const SkeletonItem = ({ type = "post" }) => {
  const baseClass = "animate-pulse bg-gray-300 rounded-md";

  if (type === "post") {
    return (
      <div className="w-full p-4 bg-white shadow rounded-md space-y-3">
        <div className="flex items-center space-x-4">
          <div className={`${baseClass} h-10 w-10 rounded-full`} />
          <div className="flex-1 space-y-2">
            <div className={`${baseClass} h-4 w-3/4`} />
            <div className={`${baseClass} h-3 w-1/2`} />
          </div>
        </div>
        <div className={`${baseClass} h-4 w-full`} />
        <div className={`${baseClass} h-4 w-5/6`} />
        <div className={`${baseClass} h-64 w-full`} />
      </div>
    );
  }

  if (type === "notification") {
    return (
      <div className="flex items-center p-4 space-x-4 bg-white rounded-md shadow">
        <div className={`${baseClass} h-10 w-10 rounded-full`} />
        <div className="flex-1">
          <div className={`${baseClass} h-4 w-3/4 mb-2`} />
          <div className={`${baseClass} h-3 w-1/2`} />
        </div>
      </div>
    );
  }

  if (type === "ProfileCard") {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow">
        <div className="relative h-25">
          <div className={`${baseClass} w-full h-22`} />
          <div className="absolute top-14 left-6 z-10">
            <div
              className={`${baseClass} rounded-full border-2 h-16 w-16 border-white`}
            />
          </div>
        </div>
        <div className="p-5 space-y-2">
          <div className={`${baseClass} h-5 w-1/2`} />
          <div className={`${baseClass} h-4 w-1/3`} />
          <div className={`${baseClass} h-4 w-1/3`} />
          <div className={`${baseClass} h-4 w-2/3`} />
        </div>
      </div>
    );
  }

  if (type === "message") {
    return (
      <div className="flex p-4 space-x-4 bg-white rounded-md shadow">
        <div className={`${baseClass} h-10 w-10 rounded-full`} />
        <div className="flex-1 space-y-2">
          <div className={`${baseClass} h-4 w-2/3`} />
          <div className={`${baseClass} h-3 w-1/3`} />
        </div>
      </div>
    );
  }

  return <div className={`${baseClass} h-10 w-full`} />;
};

export default SkeletonItem;
