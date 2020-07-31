import React from "react";
import PropTypes from "prop-types";

export const Loader = ({ className }) => {
  return (
    <div className={className} style={{ height: " 100%", padding: " 20px 0" }}>
      <img src={require("../assets/loader.gif")} width="70px" height="70px" />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};
