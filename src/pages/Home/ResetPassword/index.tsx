import React from 'react';
import { Button, Input, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss';
const { Sider, Content } = Layout;

const ResetPassword = () => {
  const history = useNavigate();

  // handel email

  const handelBackLogin = () => {
    history('/login');
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
                <form className='w-full'>
                  <h1 className='text-center text-primary-gray-500 font-bold text-[22px] leading-8'>
                    Đặt lại mật khẩu
                  </h1>
                  <div className='mt-4'>
                    <label className='font-normal text-primary-gray-300 leading-7 '>
                      Vui lòng nhập email để đăt lại mật khẩu của bạn *
                    </label>
                    <Input className='w-full h-11 rounded-lg mt-1 hover:border-primary border border-solid border-primary-gray-light-400' />
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
                </form>
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
