import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MovieIcon from "@mui/icons-material/Movie";
import { Filter } from "@mui/icons-material";

const Navbar = () => {
  return (
    // Navbar
    <div className="navbar justify-center space-x-2">
      <div className="w-[60%] flex justify-between">
        <div class="border-b  border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="mr-2">
              <a
                href="#"
                class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <label htmlFor="addPage" className="text-base text-gray-500 font-bold">
          Add pages
        </label>
      </div>

      {/* filters and other stuff */}
      <div className="flex justify-evenly w-[30%]">
        {/* dropdown */}
        <div className="flex justify-evenly items-center w-[50%]">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              className="text-gray-700 text-center cursor-pointer hover:text-green hover:bg-gray-300 rounded-full"
              tabIndex={0}
            >
              <MoreHorizIcon className="hover:scale-100"></MoreHorizIcon>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
          {/* filter */}

          <label htmlFor="my-drawer-4" className="text-xs text-gray-800 ">
            Filter <Filter className="text-sm"></Filter>
          </label>
          <label className="text-xs text-gray-800 ">
            media <MovieIcon className="text-sm"></MovieIcon>
          </label>
        </div>

        <label
          htmlFor="FilterModal"
          className="btn bg-green border-green text-white"
        >
          compose
        </label>
      </div>
    </div>
  );
};

export default Navbar;
