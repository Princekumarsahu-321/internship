import React, { useState } from "react";
import FilterModal from "./FilterModal";

///dynamic//////////
import { useDispatch } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    dispatch(propertyAction.updateSearchParams({ ...filters, page: 1 }));
    dispatch(getAllProperties());
  };

  return (
    <>
      <span
        className="material-symbols-outlined filter"
        onClick={handleShowAllPhotos}
      >
        tune
      </span>
      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters}
          onApply={applyFilters}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;
