import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../CalenderContext/GlobalContext";
import ProfileImage from "../../../images/banner.jpg";
import { MoreHoriz, ScheduleSharp } from "@mui/icons-material";
export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 justify-center cursor-pointer "
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            // onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label} p-1 mx-2  text-gray-600 text-sm rounded mb-1 truncate bg-yellow-300  border border-orange-300`}
          >
            <div className="flex justify-between">
              <label className="text-xxs">
                <ScheduleSharp className="text-xs"></ScheduleSharp>
              </label>
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  <MoreHoriz fontSize="small" className="text-"></MoreHoriz>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20 "
                >
                  <li>
                    <a>View</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center">
                <h1>{evt.postText.slice(0, 5)} .....</h1>
                {"Image" in evt ? (
                  <div className="w-[100px] h-[100px]">
                    <img
                      className="object-fill w-[90px] h-[90px]"
                      src={evt.Image}
                    ></img>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
