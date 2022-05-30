import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
type Props = {};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddService = (props: Props) => {
  const [dichVu, setDichVu] = useState({
    maDv: "201",
    capSo: {
      autoInc: ["0000", "9999"],
      prefix: "0001",
      surfix: "0001",
      everyday: false,
    },
  });
  const [form] = Form.useForm();
  //Set value
  useEffect(() => {
    form.setFieldsValue({
      dichvu:{
        maDv : "201",
        tenDv: "Dich vu 01",
        moTa : "mo ta example 01",
        capSo: ['autoInc','resetEveryday','prefix']
      }
    })

  }, [])
  
  const onFinish = (values: any) => {
    console.log(dichVu, values);
  };
  function onChange(checkedValues: any) {
    let temp = { ...dichVu };
    if (checkedValues.includes("resetEveryday")) {
      temp.capSo.everyday = true;
      setDichVu({ ...temp });
    }
  }
  const handleNumeric = (e: any) => {
    let value = e.target.value;

    if (!Number(value)) {
      return;
    }
    setDichVu({ ...dichVu, maDv: value });
  };

  const handleCapSoChange = (e: any) => {
    let value = e.target.value;
    if (value !== "000" && value !== "00" && value !== "0") {
      if (!Number(value)) {
        return;
      }
    }

    if (e.target.name.includes("autoInc")) {
      let temp = e.target.name.includes("start")
        ? [value, dichVu.capSo.autoInc[1]]
        : [dichVu.capSo.autoInc[0], value];
      setDichVu({
        ...dichVu,
        capSo: {
          ...dichVu.capSo,
          autoInc: [...temp],
        },
      });
      return;
    }

    setDichVu({
      ...dichVu,
      capSo: {
        ...dichVu.capSo,
        [e.target.name]: value,
      },
    });
  };

  const handleFocusOut = (e: any) => {
    let value = e.target.value;
    if (
      value === "000" ||
      value === "00" ||
      value === "0" ||
      value.length === 2 ||
      value.length === 3
    ) {
      if (e.target.name.includes("autoInc")) {
        let value;
        if (e.target.name.includes("start")) {
          value = ["0001", dichVu.capSo.autoInc[1]];
        } else {
          if (e.target.value === "9") {
            value = [dichVu.capSo.autoInc[0], "9000"];
          } else {
            value = [dichVu.capSo.autoInc[0], "9999"];
          }
        }

        setDichVu({
          ...dichVu,
          capSo: {
            ...dichVu.capSo,
            autoInc: [...value],
          },
        });
        return;
      }
      let newVal = "0001";
      if (value.length === 2) {
        newVal = `00${value}`;
      }
      if (value.length === 3) {
        newVal = `0${value}`;
      }
      setDichVu({
        ...dichVu,
        capSo: {
          ...dichVu.capSo,
          [e.target.name]: newVal,
        },
      });
    }
  };
  const handleFormChange=(e:any)=>{
    if(e.target.id === "nest-messages_dichvu_maDv"){
      console.log(e.target.value)
    }
  }
  return (
    <div className="update-service content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:pt-10 relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Dịch vụ &gt; Danh sách dịch vụ &gt;{" "}
        <span className="text-primary font-bold">Cập nhật</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Quản lý dịch vụ</h2>
      <div className="w-full h-full update-content">
        <h3 className="text-primary text-lg font-bold mb-3">
          Thông tin dịch vụ
        </h3>
        <Form 
          form ={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          onChange={handleFormChange}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={["dichvu", "maDv"]}
                label="Mã dịch vụ:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã dịch vụ",
                  },
                ]}
              >
                <Input value={dichVu.maDv} onChange={handleNumeric} />
              </Form.Item>
              <Form.Item
                name={["dichvu", "tenDv"]}
                label="Tên dịch vụ:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên dịch vụ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={["dichvu", "moTa"]}
                label="Mô tả:"
                className="textarea"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <h3 className="text-primary text-lg font-bold mb-3">
            Quy tắc cấp số
          </h3>
          <Form.Item name={["dichvu", "capSo"]}>
            <Checkbox.Group onChange={onChange}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Checkbox value="autoInc" style={{ lineHeight: "32px" }}>
                    Tăng tự động từ:{" "}
                    <Form.Item
                      rules={[
                        {
                          type: "number",
                        },
                      ]}
                    >
                      <Input
                        value={dichVu.capSo.autoInc[0]}
                        onBlur={handleFocusOut}
                        onChange={handleCapSoChange}
                        name="autoInc_start"
                        className="rounded-lg inlineInput"
                      />{" "}
                      đến{" "}
                      <Input
                        value={dichVu.capSo.autoInc[1]}
                        onChange={handleCapSoChange}
                        name="autoInc_end"
                        className="rounded-lg inlineInput"
                        min={0}
                        max={9999}
                      />
                    </Form.Item>
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="prefix" style={{ lineHeight: "32px" }}>
                    Prefix:
                    <Form.Item
                      rules={[
                        {
                          type: "number",
                        },
                      ]}
                    >
                      <Input
                        value={dichVu.capSo.prefix}
                        onBlur={handleFocusOut}
                        onChange={handleCapSoChange}
                        name="prefix"
                        className="rounded-lg inlineInput ml-16"
                      />{" "}
                    </Form.Item>
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="surfix" style={{ lineHeight: "32px" }}>
                    Surfix:{" "}
                    <Form.Item
                      rules={[
                        {
                          type: "number",
                        },
                      ]}
                    >
                      <Input
                        value={dichVu.capSo.surfix}
                        onBlur={handleFocusOut}
                        onChange={handleCapSoChange}
                        name="surfix"
                        className="rounded-lg inlineInput ml-16"
                      />{" "}
                    </Form.Item>
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox
                    value="resetEveryday"
                    style={{ lineHeight: "32px" }}
                  >
                    Reset mỗi ngày
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <span>
            <span className="text-primary">*</span> là trường thông tin bắt buộc
          </span>
          <Form.Item>
            <Space align="center" className=" flex justify-center w-full md:mt-4">
            <button
              type='submit'
              className='w-[160px] text-primary-400 px-6 py-[13px] rounded-lg font-bold text-base outline-none border[1.5px] border-solid border-primary-400 bg-primary-50 leading-[22px]'
            >
              Hủy bỏ
            </button>
              <button
              type='submit'
              className='w-[160px] text-white px-6 py-[13px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 leading-[22px]'
            >
              Cập nhật
            </button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddService;
