import React, { useEffect } from 'react';
import { Form, Input, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserServices from '../../../db/services/user.services';
import IUser from '../../../db/types/user.type';
import SystemLogServices from '../../../db/services/log_system.services';
import { getID } from '../../../APIs/getIP';
import './style.scss';
const { Sider, Content } = Layout;

const ResetNewPassword = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    (async () => {
      const user = await UserServices.getUser();
      setUser(user);
    })();
  });
  const handleSubmit = async (values: any) => {
    const { password, repassword } = values;
    if (password !== repassword) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Mật khẩu không trùng khớp',
        confirmButtonText: 'Đóng',
      });
    } else {
      const idxUser = user.findIndex((item: IUser) => item.id === id);
      if (idxUser !== -1) {
        const temp = { ...user[idxUser] };
        UserServices.updateUser(
          temp.id,
          temp.tenDangNhap,
          temp.hoTen,
          temp.soDienThoai,
          temp.email,
          (temp.matKhau = values.password),
          temp.vaiTro,
          temp.trangThai,
        );
        Swal.fire({
          icon: 'success',
          title: 'Thông báo',
          text: 'Đổi mật khẩu thành công',
          confirmButtonText: 'Đóng',
        });
        let ip = await getID();
        SystemLogServices.addLog({
          tenDangNhap: (user[idxUser]?.tenDangNhap as string)
            ? (user[idxUser]?.tenDangNhap as string)
            : 'Unknown',
          actionTime: new Date(),
          ip: ip.IPv4,
          action: `${user[idxUser].tenDangNhap} đã đổi mật khẩu mới`,
        });
        history('/login');
      }
    }
  };
  return (
    <React.Fragment>
      <Layout className='h-screen'>
        <Content className='w-[592px]'>
          <div className='flex justify-center items-center w-full bg-primary-light-gray'>
            <div className='flex flex-col justify-center items-center w-[400px]'>
              <div className='w-[170px] h-[137px] mt-[60px] mb-[60px]'>
                <img
                  src='/images/Logo_alta.png'
                  alt='Logo'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='w-full rewrite-pass'>
                <Form className='w-full' form={form} onFinish={handleSubmit}>
                  <h1 className='text-center text-primary-gray-500 font-bold text-[22px] leading-8 mb-3'>
                    Đặt lại mật khẩu mới
                  </h1>
                  <div className='mt-4'>
                    <Form.Item
                      label='Mật khẩu'
                      name={'password'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu',
                        },
                      ]}
                    >
                      <Input.Password
                        className='w-full h-11 rounded-lg'
                        autoComplete='off'
                      />
                    </Form.Item>
                  </div>
                  <div className='mt-4'>
                    <Form.Item
                      label='Nhập lại mật khẩu'
                      name={'repassword'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng xác nhận lại mật khẩu',
                        },
                      ]}
                    >
                      <Input.Password
                        className='w-full h-11 rounded-lg'
                        autoComplete='off'
                      />
                    </Form.Item>
                  </div>
                  <div className='text-center mt-[48px] '>
                    <button type='submit' className='btn-primary text-base'>
                      Xác nhận
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Content>
        <Sider width={'848px'}>
          <div
            style={{
              height: '100vh',
              backgroundImage: 'url(/images/poster02.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              objectFit: 'cover',
            }}
          ></div>
        </Sider>
      </Layout>
    </React.Fragment>
  );
};

export default ResetNewPassword;
