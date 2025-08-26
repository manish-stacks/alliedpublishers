import React, { useState, useEffect } from "react";
import { loaderController } from "./loaderController";
import Loader from "./Loader";

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loaderController.init(setLoading); // connect controller with React state
  }, []);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default LoaderProvider;
