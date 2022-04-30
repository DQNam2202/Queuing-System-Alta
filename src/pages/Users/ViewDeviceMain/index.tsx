import React from 'react';
const ViewDeviceMain = () => {
  return (
    <React.Fragment>
      <div className='fixed top-2 left-12'>
        <div className='w-[60px] h-[48px]'>
          <img
            src='./images/Logo_alta.png'
            alt='logo_alta'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-primary-light-gray'>
        <h2 className='text-[32px] font-bold text-primary-500 mb-[60px] leading-[48px]'>
          Thông tin hiển thị trên thiết bị MHTT-01
        </h2>
        <div className='text-left'>
          <h3 className='text-xl font-bold text-left text-primary-gray-500 mb-7'>
            Số thứ tự đang hiển thị trên thiết bị
          </h3>
          <div className='grid grid-cols-3 gap-14'>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-primary-red'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-primary-red'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 1
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-primary-pink-300'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-primary-pink-300'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 2
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-[#FCB984]'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-[#FCB984]'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 3
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-primary-blue-300'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-primary-blue-300'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 4
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-primary-green-300'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-primary-green-300 shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 5
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative w-[260px] h-[150px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='mt-8 text-center font-bold text-3xl leading-[45px] text-primary-purple-300'>
                  201001
                </div>
                <div className='w-full text-center text-white font-normal text-xl absolute bottom-0 left-0 flex justify-center items-center py-3 px-12 rounded-bl-xl rounded-br-xl bg-primary-purple-300'>
                  <div className='text-lg font-bold leading-[30px] text-primary-light-gray'>
                    Quầy dịch vụ số 6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewDeviceMain;
