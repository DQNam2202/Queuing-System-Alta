import React from 'react';
const ViewDeviceCounte = () => {
  return (
    <div>
      <div className='fixed top-2 left-12'>
        <div className='w-[60px] h-[48px]'>
          <img
            src='./images/Logo_alta.png'
            alt='Logo_Alta'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-primary-light-gray'>
        <h2 className='text-[32px] leading-[48px] font-bold text-primary-500 mb-[112px]'>
          Thông tin hiển thị trên thiết bị MHTT_01
        </h2>
        <div className='grid grid-cols-2 gap-x-[100px]'>
          <div className='flex justify-center items-center'>
            <div className='relative w-[426px] h-56 bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
              <div className='mt-8 text-center font-bold text-3xl'>
                <div className='w-[60px] h-[60px] rounded-[100px] bg-primary-light-blue flex items-center justify-center mt-8 mb-2 ml-[43%]'>
                  <img
                    src='./images/icon01.png'
                    alt='icon_01'
                    className='object-cover'
                  />
                </div>
                <div className='text-primary-blue font-bold text-3xl leading-[45px]'>
                  201001
                </div>
              </div>
              <div className='w-full text-center text-white font-normal absolute bottom-0 left-0 flex justify-center items-center py-3 px-[76px] rounded-bl-xl rounded-br-xl bg-primary-blue'>
                <div className='text-lg font-bold leading-[30px]'>
                  Số thứ tự hiển thị trên thiết bị
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='relative w-[426px] h-56 bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
              <div className='mt-8 text-center font-bold text-3xl'>
                <div className='w-[60px] h-[60px] rounded-[100px] bg-primary-light-orange flex items-center justify-center mt-8 mb-2 ml-[43%]'>
                  <img
                    src='./images/icon02.png'
                    alt='icon_02'
                    className='object-cover'
                  />
                </div>
                <div className='text-primary-400 font-bold text-3xl leading-[45px]'>
                  Quầy dịch vụ số 1
                </div>
              </div>
              <div className='w-full text-center text-white font-normal absolute bottom-0 left-0 flex justify-center items-center py-3 px-[76px] rounded-bl-xl rounded-br-xl bg-primary-300'>
                <div className='text-lg font-bold leading-[30px]'>
                  Vị trí hiển thị thiết bị
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeviceCounte;
