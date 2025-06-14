import React from "react";
import SkeletonItem from "./SkeletonItem";

const SkeletonList = ({ count = 5, type = "post" }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} type={type} />
      ))}
    </div>
  );
};

export default SkeletonList;
