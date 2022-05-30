import React, { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "antd";
import { Table } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
type Props = {};

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "stt",
    width: "50%",
  },
  {
    title: "Trạng thái",
    dataIndex: "trangThai",
    render: (trangThai: any) =>
      trangThai === "completed" ? (
        <span className="flex items-center gap-x-2">
          <span className="block h-2 w-2 bg-primary-green-500 rounded-full"></span>{" "}
          Đã hoàn thành
        </span>
      ) : trangThai === "uncompleted" ? (
        <span className="flex items-center gap-x-2">
          <span className="block h-2 w-2 bg-primary-gray-400 rounded-full"></span>
          Vắng
        </span>
      ) : (
        <span className="flex items-center gap-x-2">
          <span className="block h-2 w-2 bg-primary-blue rounded-full"></span>
          Đang thực hiện
        </span>
      ),
  },
];

const ServiceManager = (props: Props) => {
  const { id } = useParams();
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const handleDateChange = (date: any, dateString: String) => {
    console.log(date, dateString);
  };
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let random = Math.floor(Math.random() * (3 - 1 + 1) + 0);
      let temp = {
        key: index,
        stt: `201000${index}`,
        trangThai:
          random === 1 ? "completed" : random === 2 ? "uncompleted" : "pending",
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Dịch vụ &gt; Danh sách dịch vụ &gt;
        <span className="text-primary font-bold">Chi tiết</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Quản lý dịch vụ</h2>
      <div className="flex gap-x-5 relative lg:flex-col lg:overflow-y-scroll lg:max-h-[80vh]">
        <div className="w-2/6 info-content lg:w-full">
          <h3 className="text-primary mb-3 font-bold text-xl">Thông tin dịch vụ</h3>
          <table className="mb-3">
            <tbody className="text-left text-base">
              <tr>
                <th className="pr-5" scope="row">Mã dịch vụ:</th>
                <td>201</td>
              </tr>
              <tr>
                <th className="pr-5" scope="row">Tên dịch vụ:</th>
                <td>Khám tim mạch</td>
              </tr>
              <tr>
                <th className="pr-5" scope="row">Mô tả:</th>
                <td>Chuyên các bệnh lý về tim</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-primary mb-3 font-bold text-xl">Quy tắc cấp số</h3>
          <table className="mb-3 capSo">
            <tbody className="text-left text-base">
              <tr >
                <th  className="pr-5" scope="row">Tăng tự động:</th>
                <td><input className="inline-block w-16" type="text" value={"0001"}/> đến <input className="inline-block w-16 " type="text" value={"9999"}/></td>
              </tr>
              <tr >
                <th  className="pr-5" scope="row">Prefix:</th>
                <td><input className="inline-block w-16" type="text" value={"0001"}/></td>
              </tr>
              <tr >
                <th  className="pr-5" scope="row">Surfix:</th>
                <td><input className="inline-block w-16" type="text" value={"0001"}/></td>
              </tr>
              <tr >
                <th  className="pr-5" scope="row">Reset mỗi ngày</th>
              </tr>
            </tbody>
          </table>
          <p>Ví dụ: 201-2001</p>
        </div>
        <div className="w-4/6 list-content lg:w-full lg:mt-4">
          <div className="controls flex justify-between xl:flex-col">
            <div className="flex gap-x-1 mr-1">
              <div className="item flex flex-col text-sm">
                <span className="font-semibold">Trạng thái</span>
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  onChange={handleChange}
                  defaultValue={"Tất cả"}
                  className="w-[120px] "
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="completed">Đã hoàn thành</Option>
                  <Option value="pending">Đã thực hiện</Option>
                  <Option value="uncompleted">Vắng</Option>
                </Select>
              </div>
              <div className="item flex flex-col text-sm">
                <span className="font-semibold">Chọn thời gian</span>
                <div className="date-controls flex items-center">
                  <DatePicker
                    onChange={handleDateChange}
                    className="rounded-lg w-[120px] h-11"
                    format={"DD/MM/YYYY"}
                  />
                  <CaretRightOutlined className="mx-1" />
                  <DatePicker
                    onChange={handleDateChange}
                    className="rounded-lg w-[120px] h-11"
                    format={"DD/MM/YYYY"}
                  />
                </div>
              </div>
            </div>
            <div className="item flex flex-col text-sm">
              <span className="font-semibold">Từ khoá</span>
              <Input.Search
                placeholder="Nhập từ khóa"
                onSearch={(value) => console.log(value)}
                className="w-[170px] h-11"
              />
            </div>
          </div>
          <div className="relative">
            <Table
              className="mt-4"
              columns={columns}
              dataSource={table.data}
              pagination={{
                ...table.pagination,
                onChange: handlePanigationChange,
              }}
              loading={table.loading}
            />
            
          </div>
        </div>
        {/* Add button */}
        <div className="lg:flex-row lg:gap-x-2 lg:mt-3 lg:relative lg:top-auto lg:right-auto lg:w-full absolute -right-28 top-0 flex flex-col gap-y-3">
              <Link
                to={`/services-management/update/${id}`}
                className="lg:w-full flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary"
              >
                <div className="w-5 h-5">
                  <img src="/images/svgs/edit-square.svg" alt="" />
                </div>
                <span className="text-sm">Cập nhật danh sách</span>
              </Link>
              <Link
                to="/services-management/"
                className="lg:w-full  flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary"
              >
                <div className="w-5 h-5">
                  <img src="/images/svgs/back-square.svg" alt="" />
                </div>
                <span className="text-sm">Quay lại</span>
              </Link>
            </div>
      </div>
    </div>
  );
};

export default ServiceManager;
