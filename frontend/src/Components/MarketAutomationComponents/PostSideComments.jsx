import React, { useState } from "react";
import ProfileImage from "../../images/profile.jpg";
const PostSideComments = () => {
  const [openReply, setOpenReply] = useState(false);
  return (
    <div className="hidden w-[30%] md:block">
      <div className="bg-white w-full p-2">
        {/* commentslist */}
        <div className="flex">
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
              <label className="text-xxs text-gray-400 hover:text-gray-600">
                reply
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSideComments;
