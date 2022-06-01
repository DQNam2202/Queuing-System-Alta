import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import RoleServices from '../../../../db/services/role.services';
import UserServices from '../../../../db/services/user.services';
import Role from '../../../../db/types/role.type';
import User from '../../../../db/types/user.type';
import Swal from 'sweetalert2';

const validateMessages = {
  required: '${label} is required',
};
const UpdateUser = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { Option } = Select;

  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  // State
  const [role, setRole] = useState<Role[]>([]);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    RoleServices.getRole().then((roles: any) => {
      setRole(roles);
      UserServices.getUser().then((res: any) => {
        setUser(res);
      });
    });
  }, []);

  // get param
  const link = useParams();
  let { id } = link;

  // fill data to form
  useEffect(() => {
    let index = user.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      form.setFieldsValue({
        tenDangNhap: user[index].tenDangNhap,
        matKhau: user[index].matKhau,
        nhapLaiMatKhau: user[index].matKhau,
        hoTen: user[index].hoTen,
        soDienThoai: user[index].soDienThoai,
        email: user[index].email,
        vaiTro: user[index].vaiTro,
        trangThai:
          user[index].trangThai === true ? 'Hoạt động' : 'Ngưng hoạt động',
      });
    }
  }, [user]);

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
    navigate('/user-management');
  };
  const handelUpdatedData = () => {
    let data = {
      tenDangNhap: form.getFieldValue('tenDangNhap'),
      matKhau: form.getFieldValue('matKhau'),
      nhapLaiMatKhau: form.getFieldValue('nhapLaiMatKhau'),
      hoTen: form.getFieldValue('hoTen'),
      soDienThoai: form.getFieldValue('soDienThoai'),
      email: form.getFieldValue('email'),
      vaiTro: form.getFieldValue('vaiTro'),
      trangThai: form.getFieldValue('trangThai'),
    };
    // const index = user.findIndex(
    //   (item: any) => item.tenDangNhap === data.tenDangNhap,
    // );
    if (data.matKhau !== data.nhapLaiMatKhau) {
      Swal.fire({
        title: 'Error',
        text: 'Mật khẩu không trùng khớp',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    let {
      tenDangNhap,
      matKhau,
      hoTen,
      soDienThoai,
      email,
      vaiTro,
      trangThai = data.trangThai === 'Hoạt động' ? true : false,
    } = data;
    UserServices.updateUser(
      id as string,
      tenDangNhap,
      hoTen,
      soDienThoai,
      email,
      matKhau,
      vaiTro,
      trangThai,
    );
    Swal.fire({
      title: 'Successfull',
      text: 'Cập nhật thành công',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    navigate('/user-management');
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] xl:pr-2 md:mt-3 relative user-add'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4'>
        Cài đặt hệ thống &gt; Quản lý tài khoản &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Cập nhật tài khoản
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold'>Quản lý tài khoản</h2>
      <div className='xl:overflow-y-scroll xl:max-h-[80vh] py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
        <Form
          form={form}
          className=''
          onFinish={handelUpdatedData}
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
                name={'trangThai'}
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
              className='w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white'
              onClick={handelBackHome}
            >
              Hủy bỏ
            </Button>
            <Button
              htmlType='submit'
              className='w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
