import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Table, Tag } from "antd";

export default function Users({ data }) {
  const navigate = useNavigate();
  const [resquestData, setRequestData] = useState([]);
  return (
    <div className="flex flex-col bg-white py-7 px-8 mb-12 mx-6">
      <h1 className="font-railway text-gray-800 text-base mb-2">
        Profile Activation Requests
      </h1>
      {console.log(data, "this is in the table")}
      <div className="border rounded">
        <Table
          pagination={{ pageSize: 10 }}
          scroll={{ y: 200 }}
          dataSource={data}
        >
          <Table.Column title="Name" key="name" dataIndex="name"></Table.Column>
          <Table.Column
            title="Platform"
            key="platforms"
            dataIndex="platforms"
            render={(tags) => {
              return (
                <>
                  {tags.map((item) => {
                    const color =
                      item === "Any"
                        ? "volcano"
                        : ["linkedIn", "Twitter", "Facebook"].includes(item)
                        ? "blue"
                        : "purple";

                    return (
                      <>
                        <Tag color={color}>{item}</Tag>
                      </>
                    );
                  })}
                </>
              );
            }}
          ></Table.Column>
          <Table.Column
            title="Categories"
            key="category"
            dataIndex="category"
            render={(tags) => {
              return (
                <>
                  {tags.map((item) => {
                    return (
                      <>
                        <Tag color="volcano">{item}</Tag>
                      </>
                    );
                  })}
                </>
              );
            }}
          ></Table.Column>
          <Table.Column
            title="Country"
            key="country"
            dataIndex="country"
            render={(tags) => {
              return (
                <>
                  {tags.map((item) => {
                    return (
                      <>
                        <Tag>{item}</Tag>
                      </>
                    );
                  })}
                </>
              );
            }}
          ></Table.Column>
          <Table.Column
            title="Language"
            key="language"
            dataIndex="language"
            render={(tags) => {
              return (
                <>
                  {tags.map((item) => {
                    return (
                      <>
                        <Tag>{item}</Tag>
                      </>
                    );
                  })}
                </>
              );
            }}
          ></Table.Column>
        </Table>
      </div>
      {/* <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowClick={handleClick}
          rows={convertData(data)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> */}
    </div>
  );
}
