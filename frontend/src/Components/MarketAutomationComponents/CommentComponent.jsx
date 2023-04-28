import { AttachFile, Close } from "@mui/icons-material";
import React, { useState, useContext } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button } from "antd";
import { MainScreenMarketAutomationContext } from "../../Pages/MarketAutomation/MainScreenProvider";
const CommentComponent = ({ open, isOpen }) => {
  console.log(isOpen, "ths is the caleussjf");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("Comment.....");
  const { files, setFiles } = useContext(MainScreenMarketAutomationContext);
  const handleImage = (fileUpload) => {
    const reader = new FileReader();
    const type = fileUpload.type.includes("image") ? "image" : "video";

    console.log(type);
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result, "this is the result");

        setFiles([...files, { file: reader.result, type: type }]);
        console.log(files);
      }
    };
    reader.readAsDataURL(fileUpload);
  };
  const handleFileRemove = (file) => {
    const temp = files.filter((item) => {
      return item !== file;
    });
    setFiles(temp);
  };
  return (
    <div className="w-[90%]">
      <div className="flex flex-col bg-slate-100  ">
        <div
          className="text-xs p-1 max-w-[100%] min-h-16 focus:outline-none"
          contentEditable="true"
          onFocus={() => {
            setText("");
          }}
        >
          {text}
        </div>
        <div className="flex justify-between  px-1">
          <div className="flex flex-wrap self-end w-[80%] flex-1 space-x-1 justify-start p-1 ">
            {files.map((item) => {
              return (
                <div className="w-8 h-8 relative   group ">
                  {item.type === "image" ? (
                    <img
                      src={item.file}
                      className="object-fill hover:opacity-25 w-8 h-8"
                    ></img>
                  ) : (
                    <video
                      htmlFor="mediaPreview"
                      className="w-8 h-8"
                      width="400"
                      controls
                    >
                      <source src={item} />
                    </video>
                  )}
                  <div
                    htmlFor="mediaPreview"
                    className="absolute top-0 left-0 flex h-full w-full justify-end group-hover:bg-slate-600 opacity-100"
                  >
                    <Close
                      onClick={() => handleFileRemove(item)}
                      className=" text-color text-base text-white hidden group-hover:block"
                    ></Close>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-[0.25]">
            <label htmlFor="commentFile">
              <AttachFile className="text-xs"></AttachFile>
            </label>
            <label className="items-center">
              <SentimentSatisfiedAltIcon className="text-xs"></SentimentSatisfiedAltIcon>
            </label>
            <input
              onChange={(e) => {
                handleImage(e.target.files[0]);
              }}
              id="commentFile"
              type="file"
              className="hidden"
            />
          </div>
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
