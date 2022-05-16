import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';

const AddDevice = () => {
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const deciceList = ['Máy siêu âm', 'Máy nội sôi', 'Máy X-Quang'];
  const children = [];
  for (let i = 0; i < deciceList.length; i++) {
    children.push(<Option key={i}>{deciceList[i]}</Option>);
  }
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4'>
        Thiết bị &gt; Danh sách thiết bị &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Thêm thiết bị
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold'>Quản lý thiết bị</h2>
      <div className='py-2 px-6 rounded-2xl add-device shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
        <h3 className='text-xl font-bold leading-[30px] text-primary'>
          Thông tin thiết bị
        </h3>
        <Form className=''>
          <Row gutter={{ lg: 32 }} >
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Mã thiết bị'
                name='maThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your device number!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập mã thiết bị'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Loại thiết bị'
                name='loaiThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your type of device !',
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={'large'}
                  placeholder='Chọn loại thiết bị'
                  onChange={handleChange}
                  className='w-full h-11'
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Tên thiết bị'
                name='tenThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your device name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tên thiết bị'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Tên đăng nhập'
                name='tenDangNhap'
                rules={[
                  {
                    required: true,
                    message: 'Please input your user name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tài khoản'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Địa chỉ IP'
                name='ip'
                rules={[
                  {
                    required: true,
                    message: 'Please input your IP Address!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập địa chỉ IP'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Mật khẩu'
                name='matKhau'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập mật khẩu'
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label='Dịch vụ sử dụng'
                name='dichVuSuDung'
                rules={[
                  {
                    required: true,
                    message: 'Please input your current service!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập dịch vụ sử dụng'
                />
              </Form.Item>
            </Col>
          </Row>
          <span className='text-sm font-normal leading-5 text-primary-gray-300'>
            <strong className='text-primary-red'>* </strong>
            Là trường thông tin bắt buộc
          </span>
          <div className='flex justify-center items-center mt-6 gap-x-8'>
            <button
              type='submit'
              className='w-[160px] text-primary px-6 py-[13px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white leading-[22px]'
            >
              Hủy bỏ
            </button>
            <button
              type='submit'
              className='w-[160px] text-white px-6 py-[13px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 leading-[22px]'
            >
              Thêm thiết bị
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddDevice;
