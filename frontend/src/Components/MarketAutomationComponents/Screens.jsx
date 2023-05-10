import React, { useContext } from "react";
import FeedComponent from "./FeedComponent";
import { MainScreenMarketAutomationContext } from "../../Pages/MarketAutomation/MainScreenProvider";
import Calender from "./Calender";
import ContextWrapper from "./CalenderContext/ContextWrapper";
const Screens = () => {
  const { switchScreen, setSwitch } = useContext(
    MainScreenMarketAutomationContext
  );
  return (
    <div className="h-screen">
      {switchScreen === true ? (
        <FeedComponent></FeedComponent>
      ) : (
        <ContextWrapper>
          <Calender></Calender>
        </ContextWrapper>
      )}
    </div>
  );
};

export default Screens;
