import React from "react";
import Loading from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center m-5">
      <Loading
        type="BallTriangle"
        color="#607D8B"
        height={200}
        width={200}
        visible={true}
      />
    </div>
  );
}
