import { AttachFile } from "@mui/icons-material";
import React, { useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button } from "antd";
const CommentComponent = ({ open, isOpen }) => {
  console.log(isOpen, "ths is the caleussjf");
  const [text, setText] = useState("Comment.....");
  return (
    <div className="w-[90%]">
      <div className="flex flex-col bg-slate-100 w-full">
        <div
          className="text-xs p-1 w-full min-h-16 focus:outline-none"
          contentEditable="true"
          onFocus={() => {
            setText("");
          }}
        >
          {text}
        </div>
        <div className="flex flex-row-reverse  px-1">
          <label htmlFor="commentFile">
            <AttachFile className="text-xs"></AttachFile>
          </label>
          <label className="items-center">
            <SentimentSatisfiedAltIcon className="text-xs"></SentimentSatisfiedAltIcon>
          </label>
          <input id="commentFile" type="file" className="hidden" />
        </div>
      </div>

      <div className="flex flex-row-reverse space-x-2 mt-2 ">
        <Button className="bg-blue ml-1 text-white">Post</Button>
        <Button
          onClick={() => {
            open(!isOpen);
            console.log("clicked");
          }}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

export default CommentComponent;
