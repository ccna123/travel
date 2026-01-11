import { useEffect, useState } from "react";

export const Order = ({ place }) => {
  const [peolple, setPeolple] = useState(1);
  const [numOfStay, setNumOfStay] = useState(1);
  const [total, setTotal] = useState(place.price);
  const [selectOption, setSelectOption] = useState("plane");

  useEffect(() => {
    if (selectOption === "plane") {
      setTotal(place.price * peolple + numOfStay * 10 + 100);
    } else {
      setTotal(place.price * peolple + numOfStay * 10 + 30);
    }
  }, [peolple, numOfStay, selectOption]);
  return (
    <div className="bg-slate-200 rounded-xl shadow-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-around">
        <label htmlFor="">Nums of people</label>
        <input
          value={peolple}
          type="number"
          onChange={(e) => setPeolple(e.target.value)}
          className=" rounded-full p-2 w-full ml-4"
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <label>plane</label>
        <input
          type="radio"
          value="plane"
          onChange={(e) => setSelectOption(e.target.value)}
          checked={selectOption === "plane"}
        />
        <label>express bus</label>
        <input
          type="radio"
          value="express bus"
          onChange={(e) => setSelectOption(e.target.value)}
          checked={selectOption === "express bus"}
        />
      </div>
      <div className="flex items-center justify-around">
        <label htmlFor="">numbers of stay</label>
        <input
          value={numOfStay}
          type="number"
          onChange={(e) => setNumOfStay(e.target.value)}
          className="w-full rounded-full p-2 ml-4"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">total</h1>
        <p className="text-4xl font-bold">{total}$</p>
      </div>
      <button
        type="button"
        className="bg-red-500 font-bold p-2 rounded-xl text-white text-2xl hover:scale-105 duration-100 mx-4"
      >
        Check out
      </button>
    </div>
  );
};
