import React, { useState, useContext, useEffect } from "react";

import { getMonth } from "../../utils/util";
import CalendarHeader from "./CalenderComponents//CalendarHeader";
import Sidebar from "./CalenderComponents/Sidebar";
import Month from "./CalenderComponents/Month";
import GlobalContext from "./CalenderContext/GlobalContext";
import EventModal from "./CalenderComponents//EventModal";

const Calender = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  console.table(getMonth(4));
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calender;
