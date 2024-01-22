import React from "react";

const ModelC = ({ data }) => {
  return (
    <div>
      <div>Model C</div>
      <div>
        <p>{data?.id}</p>
        <p>{data?.phone}</p>
        <p>{data?.country?.name}</p>
      </div>
    </div>
  );
};

export default ModelC;
