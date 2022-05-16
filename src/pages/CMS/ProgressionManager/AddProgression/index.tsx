import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Select, Space } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopupNumberPrint from "../../../Interaction/PopupNumberPrint";

type Props = {};

const { Option } = Select;

const departmentList = [
  "Khám tim mach",
  "Khám phụ khoa",
  "Khám răng",
  "Khám mắt",
  "Khám tai mũi họng",
  "Khám da liễu",
  "Khám tiết niệu",
  "Khám thần kinh",
];
const children: any[] = [];
for (let i = 0; i < departmentList.length; i++) {
  children.push(<Option key={i}>{departmentList[i]}</Option>);
}

const AddProgression = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  return (
    <div className="content pl-[24px] pt-[29px] pr-[50px] md:mt-3 lg:pr-2 relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Cấp số &gt; Danh sách cấp số &gt;{" "}
        <span className="text-primary font-bold">Cấp số mới</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Quản lý cấp số</h2>
      <div className="flex flex-col justify-center items-center shadow-dashboard-content py-5 h-[70vh]">
        <h2 className="text-3xl font-bold leading-9 text-primary mb-10">
          CẤP SỐ MỚI
        </h2>
        <span className="text-xl font-bold text-primary-gray-400 mb-3 ">
          Dịch vụ khách hàng lựa chọn
        </span>
        <Select
          suffixIcon={<CaretDownOutlined />}
          size={"large"}
          placeholder="Chọn dịch vụ"
          onChange={handleChange}
          className="w-[400px] mb-20"
        >
          {children}
        </Select>
        <Space align="center" className=" flex justify-center w-full">
          <Link to="/progression-management" className="w-[115px] bg-primary-50 rounded-lg border-primary-400  text-primary border-2  text-center px-[20px] py-[7px] font-bold hover:text-primary hover:border-primary">
            Hủy bỏ
          </Link>
          <button
            className="w-[115px] bg-primary-400 rounded-lg border-primary-400  text-white  text-center px-[20px] py-[7px] font-bold hover:border-primary hover:bg-primary hover:text-white"
            type="submit"
            onClick={showModal}
          >
            In số
          </button>
        </Space>
      </div>
      <PopupNumberPrint handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible} showModal={showModal}/>
    </div>
  );
};

export default AddProgression;
