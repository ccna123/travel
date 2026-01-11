import { useParams } from "react-router-dom";
import travel from "../data/destination.json";
import DestinationCard from "./DestinationCard";
import { Order } from "./Order";

export const Booking = () => {
  const { id } = useParams();
  const place = travel.find((p) => p.id === parseInt(id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
      <DestinationCard place={place} />
      <Order place={place} />
    </div>
  );
};
