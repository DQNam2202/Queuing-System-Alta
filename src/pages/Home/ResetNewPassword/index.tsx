import React from 'react';
import { Input, Layout } from 'antd';
const { Sider, Content } = Layout;

const ResetNewPassword = () => {
  return (
    <React.Fragment>
      <Layout className='h-screen'>
        <Content className='w-[592px]'>
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
                  <h1 className='text-center text-primary-gray-500 font-bold text-[22px] leading-8 mb-3'>
                    Đặt lại mật khẩu mới
                  </h1>
                  <div className=''>
                    <label className='font-normal text-primary-gray-300'>
                      Mật khẩu
                    </label>
                    <Input.Password className='w-full h-11 mt-1 rounded-lg' />
                  </div>
                  <div className='mt-4'>
                    <label className='font-normal text-primary-gray-300'>
                      Nhập lại mật khẩu
                    </label>
                    <Input.Password className='w-full h-11 mt-1 rounded-lg' />
                  </div>
                  <div className='text-center mt-[48px] '>
                    <button type='submit' className='btn-primary text-base'>
                      Xác nhận
                    </button>
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

export default ResetNewPassword;
