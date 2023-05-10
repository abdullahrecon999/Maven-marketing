import React, { useState, createContext } from "react";
export const InfluencerDashboardContext = createContext();
export const InfluencerDashboardProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [openBidModal, setBidModal] = useState(false);
  const [inviteCounter, setInviteCounter] = useState(1);
  const [bidCounter, setbidCounter] = useState(1);
  const [openInviteModal, setInviteModal] = useState(false);
  return (
    <InfluencerDashboardContext.Provider
      value={{
        id,
        setId,
        openBidModal,
        setBidModal,
        inviteCounter,
        setbidCounter,
        setInviteCounter,
        bidCounter,
        openInviteModal,
        setInviteModal,
      }}
    >
      {children}
    </InfluencerDashboardContext.Provider>
  );
};
