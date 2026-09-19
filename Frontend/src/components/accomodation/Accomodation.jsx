import React, { useState } from "react";
import "../../css/Accomodation.css";
import ProgressSteps from "../ProgressSteps";
import MyAccomodation from "./MyAccomodation";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import {
  STATIC_ACCOMODATION,
  USER_ACCOMODATION_STORAGE_KEY,
} from "../../data/staticData";

const Accomodation = () => {
  const [accomodation] = useState(() => {
    const storedAccomodation = window.localStorage.getItem(
      USER_ACCOMODATION_STORAGE_KEY
    );

    if (!storedAccomodation) {
      return STATIC_ACCOMODATION;
    }

    try {
      const parsedAccomodation = JSON.parse(storedAccomodation);
      return Array.isArray(parsedAccomodation)
        ? [...STATIC_ACCOMODATION, ...parsedAccomodation]
        : STATIC_ACCOMODATION;
    } catch (error) {
      console.error("Unable to load saved accommodations", error);
      return STATIC_ACCOMODATION;
    }
  });
  const [loading] = useState(false);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accomodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {accomodation.length === 0 && !loading && (
          <p>Accomodation not available</p>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
