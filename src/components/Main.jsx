import { useState, useContext, useEffect } from "react";
import bgVideo from "../assets/bgVideo.mp4";
import { TravelContext } from "../context/TravelContext";

export const Main = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const { setFilterDestination } = useContext(TravelContext);
  const [destinations, setDestinations] = useState([]);

  const handleSearchDestination = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    fetch("/api/getDestinations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch destinations");
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setFilterDestination(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setFilterDestination]);

  useEffect(() => {
    if (date === "") {
      setFilterDestination(destinations);
    } else {
      const [, month, day] = date.split("-");
      const newDate = `${parseInt(month)}月${parseInt(day)}日`;
      const filter = destinations.filter((des) => {
        return des.departure.includes(newDate);
      });
      setFilterDestination(filter);
    }
  }, [date, setFilterDestination, destinations]);

  useEffect(() => {
    if (search === "") {
      setFilterDestination(destinations);
    } else {
      const filter = destinations.filter((des) => {
        return des.spell.toLowerCase().includes(search.toLowerCase());
      });
      setFilterDestination(filter);
    }
  }, [search, setFilterDestination, destinations]);

  const handleFilterPrice = () => {
    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);

    if (min > max) {
      // console.log(minPrice, maxPrice);
      alert(
        "the first price must not greater than the second price. Please enter again"
      );
    } else {
      const filter = destinations.filter((des) => {
        return des.price >= min && des.price <= max;
      });
      setFilterDestination(filter);
    }
  };
  const handleClearPrice = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setFilterDestination(destinations);
  };

  return (
    <div className="w-fit">
      <video
        src={bgVideo}
        loop
        autoPlay
        muted
        className="relative w-full h-full object-cover"
      />
      <div className="lg:absolute lg:top-0 lg:left-0 w-full h-full flex flex-col justify-center items-center">
        <div className="w-1/2">
          <div>
            <p className="uppercase text-sm text-white">our packages</p>
          </div>
          <div>
            <div className="mb-4">
              <p className="lg:text-2xl text-white font-bold">
                Search your Holiday
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 w-fit rounded-lg lg:flex p-10 gap-4 shadow-xl">
          <div>
            <p className="mb-4">Search your destination</p>
            <div className="flex items-center p-2 bg-gray-200 rounded-full">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchDestination(e)}
                className="w-80 bg-gray-200 border-none outline-none rounded-full"
              />
              <i className="fa-solid fa-location-dot mr-4"></i>
            </div>
          </div>
          <div>
            <p className="mb-4">Select your date</p>
            <input
              type="date"
              value={date}
              onChange={handleSelectDate}
              className="lg:w-80 w-full bg-gray-200 rounded-full p-2"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <p>Enter price</p>
            </div>
            <div className="lg:w-80 w-full bg-gray-200 rounded-full p-2 mt-4">
              <div className="flex gap-2 w-fit">
                <input
                  type="number"
                  min={300}
                  max={2000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-full px-2"
                />
                <p>~</p>
                <input
                  type="number"
                  min={300}
                  max={2000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-full px-2"
                />
                <button
                  type="button"
                  className="bg-blue-400 rounded-full text-white font-bold px-4"
                  onClick={handleFilterPrice}
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="bg-red-400 rounded-full text-white font-bold px-4"
                  onClick={handleClearPrice}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
