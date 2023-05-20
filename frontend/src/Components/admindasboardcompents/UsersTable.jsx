import React from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DataGrid,
  useGridApiEventHandler,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useState } from "react";
const columns1 = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
  },
  {
    field: "email_verified",
    headerName: "Verified",
    type: "boolean",
    width: 110,
    editable: false,
  },
  {
    field: "platforms",
    headerName: "Platform",
    width: 150,
    editable: false,
  },
];

const columns2 = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
  },
  {
    field: "email_verified",
    headerName: "Verified",
    type: "boolean",
    width: 110,
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: false,
  },
];

const UsersTable = ({ type, data }) => {
  const navigate = useNavigate();

  console.log(type);
  console.log("From Tables: ", data);

  const handleClick = (params) => {
    console.log(params.row.id);
    navigate(`influencer/${params.row.id}`, { id: params.row.id });
  };

  return (
    <div className="flex flex-col bg-white py-7 px-8 mb-12 ">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowClick={(param) => {
            console.log(param.row["_id"]);
            navigate(`influencer/${param.row["_id"]}`, {
              id: param.row["_id"],
            });
          }}
          rows={data}
          getRowId={(row) => row._id}
          columns={type === "influencer" ? columns1 : columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default UsersTable;
