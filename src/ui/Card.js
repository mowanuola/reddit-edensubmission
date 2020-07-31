import React from "react";
import PropTypes from "prop-types";

export const Card = ({
  type,
  title,
  header,
  subtitle,
  link,
  image,
  date,
  ...props
}) => {
  return (
    <div className="card mb-4" style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={image} className="card-img" style={{ height: "15em" }} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="row justify-content-between">
              {title && (
                <div className="col-10">
                  <h4 className="card-header-title">{title}</h4>
                  <div className="card-text">
                    <span>{date}</span>
                  </div>
                </div>
              )}

              {subtitle && (
                <>
                  <p className="text-muted mr-3 text-right">
                    <small>{subtitle}</small> <i class="fas fa-angle-up"></i>
                  </p>
                </>
              )}
            </div>

            <div className="card-text mt-3">
              <a href={link}>{link}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.number,
  date: PropTypes.string,
  link: PropTypes.string,
};
