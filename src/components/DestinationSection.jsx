import React, { useContext } from "react";
import { TravelContext } from "../context/TravelContext";
import DestinationCard from "./DestinationCard";

export const DestinationSection = () => {
  const { filterDestination } = useContext(TravelContext);
  return (
    <div className="p-4 mt-4">
      <h1 className="text-4xl font-bold">Most visted destination</h1>
      <div className="w-full grid md:grid-cols-3 sm:grid-cols-1 gap-6 p-4">
        {filterDestination.length > 0 ? (
          filterDestination.map((place, index) => (
            <DestinationCard key={index} place={place} />
          ))
        ) : (
          <p className="text-xl">There are no places !</p>
        )}
      </div>
    </div>
  );
};
