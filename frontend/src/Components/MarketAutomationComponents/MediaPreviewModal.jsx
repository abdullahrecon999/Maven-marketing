import React from "react";

const MediaPreviewModal = () => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="mediaPreview" className="modal-toggle" />
      <label htmlFor="mediaPreview" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
};

export default MediaPreviewModal;
