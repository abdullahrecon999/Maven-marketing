import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "antd";
import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../../../assets/plus.svg";
import GlobalContext from "../CalenderContext/GlobalContext";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <Button
        onClick={handleReset}
        className="border rounded mr-5 bg-blue text-white"
      >
        Today
      </Button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <ChevronLeft></ChevronLeft>
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <ChevronRight></ChevronRight>
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
