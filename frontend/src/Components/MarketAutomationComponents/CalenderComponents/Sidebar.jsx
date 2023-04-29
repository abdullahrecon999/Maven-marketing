import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      {/* <button
        onClick={() => {
          localStorage.clear();
        }}
        className="btn"
      >
        flush local storage
      </button> */}
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
