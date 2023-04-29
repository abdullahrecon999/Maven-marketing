import {
  BookmarkBorder,
  Check,
  Close,
  DragHandle,
  ScheduleSharp,
  Segment,
  Delete,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import GlobalContext from "../CalenderContext/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "orange", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [postText, setpostText] = useState(
    selectedEvent ? selectedEvent.postText : ""
  );
  const [Image, setImage] = useState(
    selectedEvent ? selectedEvent.Image : null
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const handleImage = (fileUpload) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(fileUpload);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      postText,
      Image,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-full mt-20 w-full fixed left-0 top-10 flex justify-center ">
      <form className="h-1/2 bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className=" text-gray-400">
            <DragHandle></DragHandle>
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className=" text-gray-400 cursor-pointer"
              >
                <Delete></Delete>
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className=" text-gray-400">
                <Close />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="postText"
              placeholder="What is on your mind"
              value={postText}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setpostText(e.target.value)}
            />
            <div className="flex items-center">
              <span className=" text-gray-400">
                <ScheduleSharp></ScheduleSharp>
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <div className="flex items-center">
              <span className=" text-gray-400">
                <Segment></Segment>
              </span>
              <label htmlFor="file">upload file</label>
              <input
                id="file"
                type="file"
                name="Image"
                placeholder="Add a Image"
                required
                className=" hidden pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue hover:bg-blue- px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
