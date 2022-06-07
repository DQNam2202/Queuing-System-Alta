import React, { useEffect } from 'react';
import { Button, Input, Layout, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserServices from '../../../db/services/user.services';
import IUser from '../../../db/types/user.type';
import './style.scss';
const { Sider, Content } = Layout;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const history = useNavigate();
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    (async () => {
      let dataUser = await UserServices.getUser();
      setUser(dataUser);
    })();
  }, []);
  // handel email

  const handelBackLogin = () => {
    history('/login');
  };
  const handleSubmit = (values: any) => {
    let index = user.findIndex((item: IUser) => item.email === values.email);
    if (index === -1) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Email không trùng khớp',
        confirmButtonText: 'Đóng',
      });
    } else {
      history('/newpass');
    }
  };
  return (
    <React.Fragment>
      <Layout className='h-screen'>
        <Content className='w-[592px] reset-pass'>
          <div className='flex justify-center items-center w-full bg-primary-light-gray'>
            <div className='flex flex-col justify-center items-center w-[400px]'>
              <div className='w-[170px] h-[137px] mt-[60px] mb-[60px]'>
                <img
                  src='./images/Logo_alta.png'
                  alt='Logo'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='w-full'>
                <Form className='w-full' form={form} onFinish={handleSubmit}>
                  <h1 className='text-center text-primary-gray-500 font-bold text-[22px] leading-8'>
                    Đặt lại mật khẩu
                  </h1>
                  <div className='mt-4'>
                    <Form.Item
                      name={'email'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập email',
                        },
                        {
                          type: 'email',
                          message: 'Wrong format email!',
                        },
                      ]}
                    >
                      <Input
                        className='w-full h-11 rounded-lg mt-1 hover:border-primary border border-solid border-primary-gray-light-400'
                        autoComplete='off'
                      />
                    </Form.Item>
                  </div>
                  <div className='flex justify-center mt-[48px] gap-x-[33px]'>
                    <Button
                      className='btn-primary btn-outline text-base btn-cancel'
                      onClick={handelBackLogin}
                    >
                      Hủy
                    </Button>
                    <Button htmlType='submit' className='btn-primary text-base'>
                      Tiếp tục
                    </Button>
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
              backgroundImage: 'url(./images/poster02.png)',
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

export default ResetPassword;
