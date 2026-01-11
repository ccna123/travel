import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Appbar = () => {

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    (async () => {
      setUserInfo(await fetchUserInfo())
    })()
  }, [])


  async function fetchUserInfo() {
    try {
      const res = await fetch('/.auth/me');
      const payload = await res.json();
      const user = payload.clientPrincipal;
      console.log(user);
      setUserInfo(user)
      return user
    } catch (error) {
      console.error("No profile could be found");
      return undefined
    }
  }

  return (
    <div className="bg-white flex flex-col lg:flex-row lg:justify-between lg:items-center p-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src="/imgs/travel.png" className="w-16 h-16" alt="" />
        </div>
      </div>
      <nav
        className={"flex justify-between z-10"}
      >
        <ul className="flex md:flex-row flex-col gap-8 p-2 text-black font-bold">
          <Link
            to="/"
            className="text-2xl hover:cursor-pointer hover:bg-gray-400 hover:text-black p-2 rounded-lg duration-150"
          >
            Home
          </Link>
          <li className="text-2xl hover:cursor-pointer hover:bg-gray-400 hover:text-black p-2 rounded-lg duration-150">
            Services
          </li>
          <li className="text-2xl hover:cursor-pointer hover:bg-gray-400 hover:text-black p-2 rounded-lg duration-150">
            Packages
          </li>
          <li className="text-2xl hover:cursor-pointer hover:bg-gray-400 hover:text-black p-2 rounded-lg duration-150">
            About
          </li>
        </ul>
      </nav>

      <div className="w-fit z-10">
        <div className="flex justify-between gap-4">
          <a
            href="/.auth/login/aad"
            onClick={(e) => {
              if (userInfo) {
                e.preventDefault();
              }
            }}
            className="
    font-bold text-white uppercase flex items-center justify-center
    bg-blue-600 hover:bg-green-400
    hover:scale-105 transition-transform
    px-10 rounded-lg h-12
  "
          >
            {userInfo ? `Hello, ${userInfo.userDetails}` : 'Login'}
          </a>
          {userInfo && (
            <a
              href="/.auth/logout"
              className="
          flex items-center justify-center
    font-bold text-white uppercase
    bg-red-600 hover:scale-105 transition-transform
    px-10 rounded-lg
        "
            >
              Logout
            </a>
          )}

          <button
            type="button"
            className="
          font-bold h-12 text-white w-full  uppercase bg-blue-600 hover:bg-green-400 duration-100 hover:text-white hover:scale-105 transition-transform px-10  rounded-lg"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};
