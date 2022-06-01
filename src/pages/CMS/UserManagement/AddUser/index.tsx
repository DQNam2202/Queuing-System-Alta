import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import RoleServices from '../../../../db/services/role.services';
import UserServices from '../../../../db/services/user.services';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss';
const validateMessages = {
  required: '${label} is required!',
};
const AddUser = () => {
  const { Option } = Select;
  const history = useNavigate();
  const [role, setRole] = useState([]);
  const [user, setUser] = useState([]);

  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  // Lấy thông tin vai trò selectbox
  useEffect(() => {
    RoleServices.getRole().then((roles: any) => {
      setRole(roles);
      UserServices.getUser().then((res: any) => {
        setUser(res);
      });
    });
  }, []);

  // Tình trạng
  const statusList = ['Tất cả', 'Ngưng hoạt động', 'Hoạt động'];
  const childrens = [];
  for (let i = 0; i < statusList.length; i++) {
    childrens.push(
      <Option key={i} value={statusList[i]}>
        {statusList[i]}
      </Option>,
    );
  }
  const handelBackHome = () => {
    history('/user-management');
  };
  const handelAddData = (value: any) => {
    const index = user.findIndex(
      (item: any) => item.tenDangNhap === value.tenDangNhap,
    );
    if (value.matKhau !== value.nhapLaiMatKhau) {
      Swal.fire({
        title: 'Error',
        text: 'Mật khẩu không trùng khớp',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    if (index === -1) {
      let {
        tenDangNhap,
        hoTen,
        soDienThoai,
        email,
        matKhau,
        vaiTro,
        trangThai = value.trangThai === 'Hoạt động' ? true : false,
        avatar = 'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      } = value;
      // Add user
      UserServices.addUser(
        tenDangNhap,
        hoTen,
        soDienThoai,
        email,
        matKhau,
        vaiTro,
        trangThai,
        avatar,
      );
    }
    Swal.fire({
      title: 'Successfull',
      text: 'Thêm thành công',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setTimeout(() => {
      history('/user-management');
    }, 1000);
  };
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
        <Form
          className=''
          onFinish={handelAddData}
          validateMessages={validateMessages}
        >
          <Row gutter={{ lg: 32 }}>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Họ tên'
                name={'hoTen'}
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
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Tên đăng nhập'
                name={'tenDangNhap'}
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
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Số điện thoại'
                name={'soDienThoai'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                  {
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message: 'Wrong format phone number!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập số điện thoại'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Mật khẩu'
                name={'matKhau'}
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
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Email'
                name={'email'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your email',
                  },
                  {
                    type: 'email',
                    message: 'Wrong format email!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập email'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Nhập lại mật khẩu'
                name={'nhapLaiMatKhau'}
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
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Vai trò'
                name={'vaiTro'}
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
                  {role && role.length > 0
                    ? role.map((item: any) => {
                        return <Option key={item.id}>{item.tenVaiTro}</Option>;
                      })
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label='Tình trạng'
                name={'tinhTrang'}
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
            <Button
              className='w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white '
              onClick={handelBackHome}
            >
              Hủy bỏ
            </Button>
            <Button
              htmlType='submit'
              className='w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
            >
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
