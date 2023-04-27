import React, { useState } from "react";
import ProfileImage from "../../images/profile.jpg";
import CommentComponent from "./CommentComponent";

const PostSideComments = () => {
  const [openReply, setOpenReply] = useState(false);
  const [openNewComment, setOpenNewComment] = useState(false);
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
              {openReply ? (
                <label
                  onClick={() => setOpenReply(!openReply)}
                  className="text-xxs text-gray-400 hover:text-gray-600"
                >
                  reply
                </label>
              ) : // <CommentComponent open={setOpenNewComment} isOpen={openReply} />
              null}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="flex space-y-2 flex-col justify-center mt-1 hover:border rounded-md p-1 space-x-1">
          <div className="flex space-x-1">
            <img className="w-5 h-5 rounded-full" src={ProfileImage} alt="" />
            {!openNewComment ? null : (
              <label
                onClick={() => setOpenNewComment(!openNewComment)}
                className="text-xs text-gray-400"
              >
                Add a comment...
              </label>
            )}
          </div>

          {openNewComment === true && (
            <div className="flex flex-row-reverse">
              <CommentComponent
                open={setOpenNewComment}
                isOpen={!openNewComment}
              ></CommentComponent>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSideComments;
