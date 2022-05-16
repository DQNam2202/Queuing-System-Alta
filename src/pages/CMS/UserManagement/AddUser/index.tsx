import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
const AddUser = () => {
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  // Vai trò
  const oleList = ['Kế toán', 'Quản lý', 'Admin'];
  const children = [];
  for (let i = 0; i < oleList.length; i++) {
    children.push(<Option key={i}>{oleList[i]}</Option>);
  }
  // Tình trạng
  const statusList = ['Tất cả', 'Ngưng hoạt động', 'Hoạt động'];
  const childrens = [];
  for (let i = 0; i < statusList.length; i++) {
    childrens.push(<Option key={i}>{statusList[i]}</Option>);
  }
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] xl:pr-2 md:mt-3 relative user-add'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4'>
        Cài đặt hệ thống &gt; Quản lý tài khoản &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Thêm tài khoản
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold'>Quản lý tài khoản</h2>
      <div className='xl:overflow-y-scroll xl:max-h-[80vh] py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
        {/* <h3 className='text-xl font-bold leading-[30px] text-primary'>
          Thông tin thiết bị
        </h3> */}
        <Form className=''>
          <Row gutter={{ lg: 32 }}>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Họ tên'
                name='hoTen'
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập họ tên'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Tên đăng nhập'
                name='tenDangNhap'
                rules={[
                  {
                    required: true,
                    message: 'Please input your login name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tên đăng nhập'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Số điện thoại'
                name='soDienThoai'
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập số điện thoại'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
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
                <Input.Password
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập mật khẩu'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your email',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập email'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Nhập lại mật khẩu'
                name='nhapLaiMatKhau'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập lại mật khẩu'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Vai trò'
                name='vaiTro'
                rules={[
                  {
                    required: true,
                    message: 'Please input your ole!',
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={'large'}
                  placeholder='Chọn loại vai trò'
                  onChange={handleChange}
                  className='w-full h-11'
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Tình trạng'
                name='tinhTrang'
                rules={[
                  {
                    required: true,
                    message: 'Please input your status of the account!',
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={'large'}
                  placeholder='Chọn tình trạng'
                  onChange={handleChange}
                  className='w-full h-11'
                >
                  {childrens}
                </Select>
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
              className='w-[147px] text-primary px-6 py-[10px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white leading-[22px]'
            >
              Hủy bỏ
            </button>
            <button
              type='submit'
              className='w-[147px] text-white px-6 py-[10px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 leading-[22px]'
            >
              Thêm
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
