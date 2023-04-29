import React, { useState } from "react";
import ProfileImage from "../../images/profile.jpg";
import CommentComponent from "./CommentComponent";

const PostSideComments = () => {
  const [openReply, setOpenReply] = useState(false);
  const [openNewComment, setOpenNewComment] = useState(false);
  const handleNewCommentClose = () => {
    setOpenNewComment(!openNewComment);
  };
  const handleCommentClose = () => {
    setOpenReply(!openReply);
  };
  return (
    <div className="hidden w-[30%] md:block">
      <div className="bg-white w-full p-2 ">
        {/* commentslist */}
        {/* individual comment */}
        {/* this will go in a loop */}
        <div className="flex p-1 hover:border rounded-md ">
          <img className="w-5 h-5 rounded-full" src={ProfileImage} alt="" />
          <div>
            <div className="flex flex-col justify-center ">
              <span className="text-xxs px-1 text-gray-500 ">
                {/* <span>
                <strong> user 1</strong>
              </span> */}
                <strong className="text-gray-800"> User 1</strong> date
              </span>
            </div>

            <div className="mt-1 px-1">
              <div className="text-xs"> @Bryn can you share the source?</div>
              {!openReply ? (
                <label
                  onClick={() => setOpenReply(!openReply)}
                  className="text-xxs text-gray-400 hover:text-gray-600"
                >
                  reply
                </label>
              ) : (
                <div className="min-w-[80%] max-w-[80%]">
                  <CommentComponent open={setOpenReply} isOpen={openReply} />
                </div>
              )}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="flex space-y-2 flex-col justify-center mt-1 hover:border rounded-md p-1 space-x-1">
          <div className="flex space-x-1">
            <img className="w-5 h-5 rounded-full" src={ProfileImage} alt="" />
            {openNewComment ? (
              <div className="flex flex-row-reverse w-full">
                <CommentComponent
                  open={handleNewCommentClose}
                  isOpen={!openNewComment}
                ></CommentComponent>
              </div>
            ) : (
              <label
                onClick={() => setOpenNewComment(!openNewComment)}
                className="text-xs text-gray-400"
              >
                Add a comment...
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSideComments;
