import React, { useState } from "react";
import { Button, Input, Modal, Tag } from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import * as Yup from "yup";
import axios from "axios";
const ValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required("The Contract description is required")
    .min(2, "Contract description should be atleast 200 characters")
    .max(
      2000,
      "The contract description should not be more than 2000 characters"
    ),
  amount: Yup.number("amount must be a number")
    .required("Amount is Required")
    .min(5, "Amount should be atleast 5"),
  date: Yup.date().required("Date is required "),
});
const BrandContractModal = ({
  open,
  setOpen,
  id,
  data,
  type = "handleBidDetails",
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleCancle = () => {
    setOpen(false);
    setSuccess(false);
    setLoading(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    var bid = {};

    if (type !== "invite") {
      bid = await axios.get(
        `http://localhost:3000/brand/getbiddetails/${data?.key}`
      );
    } else {
      bid = await axios.get(
        `http://localhost:3000/brand/getinvitedetails/${data?.key}`
      );
    }
    if (Object.keys(bid).length !== 0) {
      const val = {
        campaignId: bid?.data?.data?.campaignId["_id"],
        to: bid?.data?.data?.sender["_id"],
        sender: bid?.data?.data?.campaignId?.brand,
        accepted: false,
        amount: values.amount,
        expiresAt: values.date,
        description: values.description,
      };
      console.log(val);
      axios.post("http://localhost:3000/brand/createContract", val);
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <Modal
      title="Create Contract?"
      open={open}
      onCancel={handleCancle}
      footer={[]}
    >
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{ description: "", amount: 0, date: "" }}
      >
        {(Formik) => {
          return (
            <div>
              <div className="px-5">
                <h1 className="text-xl font-semibold text-gray-900 ">
                  Contract Details
                </h1>
                <p className="text-sm text-gray-500 ">
                  Enter Contract details to set up the contract between the you
                  and influencer
                </p>
                <div className="py-2 px-1 border rounded-sm h-80 overflow-y-auto ">
                  <div className=" mb-1 px-3">
                    <h2 className="text-sm text-gray-800 font-semibold">
                      Campaign Name
                    </h2>
                    <h1 className="text-base text-gray-900 font-medium ">
                      {data?.campaignName}
                    </h1>
                  </div>
                  <div className=" mb-3 px-3">
                    <h1 className="text-sm text-gray-800 font-semibold">
                      Influencer Information
                    </h1>
                    <h1 className="text-base text-gray-900 font-medium ">
                      {data?.sender}
                    </h1>
                  </div>
                  <Form>
                    <div className="grid grid-cols-2 gap-3 px-1">
                      <div className="col-span-2">
                        <h1 className="text-base font-medium text-gray-800">
                          Contract Description
                        </h1>
                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xxs"
                          name="description"
                        />
                        <Field name="description">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <Input.TextArea
                                showCount
                                maxLength={2000}
                                autoSize={{ minRows: 4 }}
                                allowClear
                                {...field}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  Formik.setFieldValue(
                                    "description",
                                    e.target.value
                                  );
                                }}
                              ></Input.TextArea>
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        <h1 className="text-base font-medium text-gray-800">
                          Contract Amount{" "}
                          <span className="text-red-500">*</span>
                        </h1>

                        <Field name="amount">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <Input
                                required
                                className=""
                                onChange={(e) => {
                                  Formik.setFieldValue(
                                    "amount",
                                    e.target.value
                                  );
                                }}
                                placeholder="Enter amount"
                                {...field}
                              ></Input>
                            </div>
                          )}
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xxs"
                          name="amount"
                        />
                      </div>
                      <div>
                        <h1 className="text-base font-medium text-gray-800 ">
                          End Date <span className="text-red-500">*</span>
                        </h1>

                        <Field name="date">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <Space direction="vertical">
                                <DatePicker
                                  {...field}
                                  onChange={(date, dateString) => {
                                    Formik.setFieldValue(
                                      "date",
                                      dayjs(dateString)
                                    );
                                  }}
                                />
                              </Space>
                            </div>
                          )}
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xxs"
                          name="date"
                        />
                      </div>
                      {/* {ashshjead} */}
                    </div>
                    <div className="py-3 flex flex-row-reverse">
                      {!success ? (
                        <Button
                          loading={loading}
                          onClick={() => {
                            handleSubmit(Formik.values);
                          }}
                          disabled={!(Formik.isValid && Formik.dirty)}
                          rootClassName="bg-blue text-white"
                        >
                          Send Contract
                        </Button>
                      ) : (
                        <Tag color="green">Contract created successfully</Tag>
                      )}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default BrandContractModal;
