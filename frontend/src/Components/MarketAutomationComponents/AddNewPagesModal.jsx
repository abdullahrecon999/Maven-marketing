import React from "react";

const AddNewPagesModal = () => {
  return (
    <>
      <input type="checkbox" id="addPage" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-[90%]">
          <div className="flex justify-center w-full">
            <h1 className="font-semibold">Add a new Page or Profile</h1>
            <div className="modal-action self-end">
              <label htmlFor="addPage" className="btn">
                Yay!
              </label>
            </div>
          </div>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
};

export default AddNewPagesModal;
