import React from "react";
import { StarRating } from "./StarRating";
import { Link } from "react-router-dom";

export const DestinationCard = ({ place }) => {
  return (
    <div className="rounded-xl shadow-xl hover:cursor-pointer hover:scale-105 duration-150">
      <div className="w-full h-96">
        <img src={place.img} className="rounded-t-xl w-full h-full" />
      </div>
      <div className="p-5">
        <h1 className="font-bold text-xl">{place.name}</h1>
        <h4 className="font-bold">{place.spell}</h4>
        <div className="flex items-center">
          <i className="fa-solid fa-location-dot mr-4"></i>
          <p>日本</p>
        </div>
        <p>Departure: {place.departure}</p>
        <div className="flex gap-4 mt-4">
          <StarRating />
        </div>
        <hr className="border my-4" />
        <div className="flex justify-around items-center">
          <p className="text-4xl font-bold">Price</p>
          <p className="text-4xl font-bold text-red-500">${place.price}</p>
        </div>
        <hr className="border my-4" />
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
            harum quo exercitationem quas fugit vitae provident. Temporibus,
            voluptate, commodi nulla molestiae mollitia exercitationem accusamus
            obcaecati illum laborum facilis excepturi molestias?
          </p>
        </div>
        <Link
          to={`booking/${place.id}`}
          className=" hover:bg-black hover:text-white duration-150 bg-green-400 mt-4 w-fit px-4 py-2 rounded-2xl flex items-center gap-4 text-white"
        >
          <button type="button" className="font-bold">
            Book
          </button>
          <i className="fa-solid fa-folder"></i>
        </Link>
      </div>
    </div>
  );
};
