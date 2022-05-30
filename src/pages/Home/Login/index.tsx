import React from 'react';
import {Input, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;

const Login = () => {
  const history = useNavigate()
  const handleRedirect = ():void=>{
    history('/dashboard')
  }
  return (
    <React.Fragment>
      <Layout className='h-screen'>
        <Content className='w-[592px]'>
          <div className='flex justify-center items-center w-full bg-primary-light-gray'>
            <div className='flex flex-col justify-center items-center w-[400px]'>
              <div className='w-[170px] h-[136px] mt-[60px] mb-[60px]'>
                <img
                  src='./images/Logo_alta.png'
                  alt='Logo-Alta'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='w-full'>
                <form className='w-full'>
                  <div>
                    <label className='text-lg text-primary-gray-300 font-normal mb-1'>
                      Tên đăng nhập *
                    </label>
                    <Input className='w-full h-11 rounded-lg  hover:border-primary' />
                  </div>
                  <div className='mt-4'>
                    <label className='text-lg text-primary-gray-300 font-normal mb-1'>
                      Mật khẩu *
                    </label>
                    <Input.Password className='w-full h-11 rounded-lg' />
                  </div>
                  <div className='text-center mt-[48px]'>
                    <button type='submit' className='btn-primary' onClick={handleRedirect}>
                      Đăng nhập
                    </button>
                  </div>
                  <div className='flex justify-center items-center'>
                    <a
                      href='./'
                      className='text-primary-red mt-2 text-base font-normal text-center hover:text-primary-red'
                    >
                      Quên mật khẩu?
                    </a>
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
              backgroundImage: 'url(./images/poster01.png)',
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

export default Login;
