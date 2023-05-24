import React, { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { ContractContext } from "../ContractProvider";
import { storage } from "../../../utils/fireBase/fireBaseInit";
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { async } from "@firebase/util";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../utils/authProvider";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const length = true;
const type = 0;
const Container = () => {
  const { contract, setContract } = useContext(ContractContext);
  const [files, setFile] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const [uploaded, setUploaded] = useState(false);
  const { id } = useParams();
  const handleChange = (e) => {
    console.log(e.file);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const getFiles = async () => {
    setLoading(true);
    const fileRef = ref(storage, contract?.filesRef);
    // const list = await listAll(fileRef);
    listAll(fileRef)
      .then((list) => {
        if (list.items.length !== 0) {
          const temp = [];
          list.items.map(async (item) => {
            console.log(list.items.length);
            try {
              const url = await getDownloadURL(ref(storage, item));
              const metaData = await getMetadata(ref(storage, item));
              console.log(url + "this is the url");
              temp.push({
                name: metaData.name,
                ref: item,
                date: metaData.timeCreated,
                url: url,
              });
            } catch (e) {
              console.log("there was some eroorrrr opsiii");
            }
          });
          setUploadedFiles(temp);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const checkFiles = async () => {
  //   console.log("Contract and comma", contract);
  //   try {
  //     const fileRef = ref(storage, contract?.filesRef);
  //     const list = await listAll(fileRef);

  //     if (list.items.length !== 0) {
  //       setCheckIfFiles(true);
  //       const temp = [];
  //       list.items.forEach(async (item) => {
  //         console.log(list.items.length);
  //         try {
  //           const url = await getDownloadURL(ref(storage, item));
  //           const metaData = await getMetadata(ref(storage, item));
  //           console.log(url + "this is the url");
  //           temp.push({
  //             name: metaData.name,
  //             ref: item,
  //             date: metaData.timeCreated,
  //             url: url,
  //           });
  //         } catch (e) {
  //           console.log("there was some eroorrrr opsiii");
  //         }
  //       });
  //       setUploadedFiles(temp);
  //       return temp;
  //     } else {
  //       setCheckIfFiles(false);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const { data, isLoading, isError, refetch } = useQuery(["fetchfiles"], () => {
    return axios.get("http://localhost:3000/brand/getcontractdetails/" + id);
  });

  useEffect(() => {
    if (data?.data?.data) {
      setContract(data?.data?.data);
    }
  }, [data?.data]);

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure to delete file name")) {
      await axios.post(
        "http://localhost:3000/influencer/removefile/" + contract?._id,
        { file: item }
      );
      refetch();
    }
  };

  // useEffect(() => {
  //   console.log("inside useEffect");
  //   checkFiles();
  //   console.log("after useEffect");
  // }, [contract]);

  const upload = async (files) => {
    const fileRef = ref(storage, contract?.filesRef + "/" + files.name);

    uploadBytes(fileRef, files)
      .then(async (file) => {
        alert(`${file.name} is uploaded`);
        try {
          const url = await getDownloadURL(fileRef);
          const metaData = await getMetadata(fileRef);

          const val = {
            name: metaData.name,
            ref: fileRef,
            date: metaData.timeCreated,
            url: url,
          };
          await axios.post(
            "http://localhost:3000/influencer/addfile/" + contract?._id,
            { file: val }
          );
          refetch();
          setUploadedFiles([...uploadedFiles, val]);
        } catch (e) {
          console.log("there was some eroorrrr opsiii");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="px-4 py-5 space-y-4 border mx-4 my-3">
      <div>
        {user?.role === "influencer" ? (
          <div>
            <h1 className="font-semibold text-base text-gray-800">
              Upload your work
            </h1>
            <p className="text-sm text-gray-600">
              Upload files of your work on campaign here, this allows the client
              to determine the quality of your work
            </p>
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-base text-gray-800">
              View the influencers work
            </h1>
          </div>
        )}
        <div className="flex flex-row-reverse my-3">
          <Button
            className="text-white bg-blue"
            loading={loading}
            onClick={() => getFiles()}
          >
            Refresh
          </Button>
        </div>
        {loading ? null : (
          <div>
            {console.log(uploadedFiles)}

            <>
              {contract?.files?.map((item) => {
                return (
                  <div
                    className="flex justify-between bg-white px-4 py-2 my-1"
                    key={item}
                  >
                    {console.log(item)}
                    <div>
                      <h1 className="text-base text-gray-800 font-semibold">
                        {item.name}
                      </h1>
                      <p className="text-xs text-gray-600 ">
                        Uploaded At{" "}
                        {dayjs(item.date).toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center flex-col gap-3">
                      <a
                        className="link text-blue"
                        href={item.url}
                        target="_blank"
                      >
                        View
                      </a>
                      {user?.role === "brand" ? null : (
                        <Button
                          onClick={() => {
                            handleDelete(item.ref, item.name);
                          }}
                          className="text-white bg-red-500"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
            {console.log(uploadedFiles)}
          </div>
        )}
      </div>

      {user?.role === "brand" ? null : (
        <div className="max-w-full">
          <label
            className="px-4 py-2 bg-blue text-white rounded-md"
            htmlFor="file"
          >
            Upload files
          </label>
          <input
            id="file"
            className="hidden"
            type="file"
            onChange={(e) => {
              upload(e.target.files[0]);
            }}
          ></input>
        </div>
      )}
    </div>
  );
};

export default Container;
