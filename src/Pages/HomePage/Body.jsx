import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../helpers/axios";
import { Button, Table } from "antd";
import { useCallback } from "react";
import { PlusOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
const defaultPageSize = 10;

export default function () {
  const deleteVehicle = useCallback(async (id) => {
    try {
      await axiosInstance.delete(`/vehicles?id=${id}`);
      setVehicles((prev) => {
        return prev.filter((vehicle) => vehicle._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Registered year",
      dataIndex: "registeredYear",
      key: "registeredYear",
      sorter: {
        compare: (a, b) => {
          if (a.registeredYear < b.registeredYear) return -1;
          if (b.registeredYear < a.registeredYear) return 1;
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: "Vehicle Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (val) => (
        <span
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            danger
            onClick={async function () {
              const isConfirm = confirm("Press a button!");
              if (isConfirm === true) {
                await deleteVehicle(val._id);
              }
            }}
            icon={<DeleteFilled />}
            type="primary"
          ></Button>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "orange",
            }}
            icon={<EditFilled />}
            type="primary"
          ></Button>
        </span>
      ),
    },
  ];
  const history = useHistory();
  const [vehicles, setVehicles] = useState([]);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const getVehicles = useCallback(
    async ({ limit, page }) =>
      axiosInstance.get(`/vehicles?page=${page}&limit=${limit}`),
    []
  );

  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all([
          axiosInstance.get("/vehicles/count"),
          getVehicles({ limit: defaultPageSize, page: 1 }),
        ]);
        setCount(() => {
          return data[0]?.data?.count;
        });
        setVehicles(data[1]?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <main
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        style={{
          float: "right",
          display: "flex",
          color: "blue",
          alignItems: "center",
          justifyItems: "center",
        }}
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => history.push("/vehicleAction")}
      >
        Add
      </Button>
      {count !== null && count !== undefined && (
        <h2
          style={{
            textAlign: "left",
          }}
        >
          Total Vehicles : {count}{" "}
        </h2>
      )}
      <Table
        loading={loading}
        pagination={{
          defaultPageSize,
          total: count,
          onChange: async (page) => {
            try {
              setLoading(true);
              const { data } = await getVehicles({
                limit: defaultPageSize,
                page,
              });
              setVehicles(data?.data);
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          },
        }}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        dataSource={vehicles.map((vehicle) => {
          return {
            key: vehicle._id,
            ...vehicle,
          };
        })}
        columns={columns}
      />
    </main>
  );
}
