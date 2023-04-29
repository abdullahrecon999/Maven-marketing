import React, { useState } from "react";
import masterCardPng from "../../images/mastercard-26161.png";
import { Button } from "@mui/material";
const InfluencerManagePaymentMethods = () => {
  const [open, setopen] = useState(false);
  const handleViewDetails = () => {
    setopen(!open);
  };
  return (
    <>
      <label htmlFor="managePayments" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="managePayments" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="managePayments"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Management Payments</h3>

          {/* this is the payments methods div and list */}
          <div className="flex flex-col px-6 py-3  mt-3">
            <h1 className="text-base text-gray-800 font-semibold">
              Your payment methods
            </h1>
            <div className="border h-[300px] overflow-y-auto">
              <div className="flex justify-evenly items-center p-2  bg-white ">
                <img
                  src={masterCardPng}
                  alt="andjahs"
                  className="w-[30px] h-[30px]"
                ></img>
                <h1 className="text-sm font-semibold text-gray-800">
                  Master Card 1245*******789
                </h1>
                <label
                  onClick={() => {
                    handleViewDetails();
                  }}
                  className="link text-xs text-blue font-semibold"
                >
                  View or remove
                </label>
              </div>
              {open && (
                <div className="bg-white w-full px-3 py-2">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <h1 className="text-sm text-gray-800 font-semibold">
                        Card Holder Name
                      </h1>
                      <p className="text-sm text-gray-600 font-semibold">
                        Hassan Ajmal
                      </p>
                    </div>
                    <div>
                      <h1 className="text-sm text-gray-800 font-semibold">
                        Card Number
                      </h1>
                      <p className="text-sm text-gray-600 font-semibold">
                        1234567*****2345
                      </p>
                    </div>
                    <div className="flex space-x-8">
                      <div>
                        <h1 className="text-sm text-gray-800 font-semibold">
                          CVV
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                          1235
                        </p>
                      </div>
                      <div>
                        <h1 className="text-sm text-gray-800 font-semibold">
                          Expiry Date
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                          abcs
                        </p>
                      </div>
                    </div>
                    <div className="self-end">
                      <Button
                        onClick={() => {
                          alert(
                            "are you sure you want to remove the payment method"
                          );
                        }}
                        variant="contained"
                      >
                        Remove Card
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerManagePaymentMethods;
