import React from 'react';
const LoginViewProfile = () => {
  return (
    <React.Fragment>
      <div className='fixed w-full h-[50px] bg-primary-blue'>
        <div className='flex items-center h-full ml-[220px]'>
          <div className='w-[68px] h-[28px]'>
            <img
              src='./images/logo.png'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
      <div
        className='flex items-center justify-center min-h-screen'
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className='px-8 py-6 text-left w-[680px] mt-[60px]'>
          <h3 className='text-lg leading-[25px] font-bold text-left text-primary-gray-300'>
            Đăng nhập
          </h3>
          <form>
            <div className='mt-[48px]'>
              <div className='text-field'>
                <label
                  htmlFor='userName'
                  className='inline-block text-sm leading-5 text-primary-gray-300 font-semibold cursor-pointer mb-2'
                >
                  Tên đăng nhập *
                </label>
                <input
                  autoComplete='off'
                  type='text'
                  id='username'
                  placeholder='Nhập tên đăng nhập'
                  className='w-full block py-[10px] text-sm bg-transparent text-primary-gray-300'
                  style={{ borderBottom: '1px solid #4680FF' }}
                />
              </div>
              <div className='text-field mt-5 mb-[100px]'>
                <label
                  htmlFor='passWord'
                  className='inline-block text-sm leading-5 text-primary-gray-300 font-semibold cursor-pointer mb-2'
                >
                  Mật khẩu *
                </label>
                <input
                  autoComplete='off'
                  type='password'
                  id='password'
                  placeholder='Typing something'
                  className='w-full block py-[10px] text-sm bg-transparent text-primary-gray-300'
                  style={{ borderBottom: '1px solid #4680FF' }}
                />
              </div>
              <div className='flex items-baseline justify-between'>
                <a
                  href='#!'
                  className='text-sm font-normal leading-5 text-blue-600 hover:underline'
                >
                  Quên mật khẩu?
                </a>
                <button className='px-[9px] py-3 text-white bg-blue-600 rounded-sm hover:bg-blue-600 text-sm leading-5 font-normal'>
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginViewProfile;
