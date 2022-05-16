import React from 'react';
const GearLevelDevice = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Logo */}
      <div className='fixed top-2 left-12'>
        <div className='w-[60px] h-[48px]'>
          <img
            src='./images/Logo_alta.png'
            alt='Logo_Alta'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      {/* Content */}
      <div className='flex flex-col items-center justify-center min-h-screen '>
        <h2 className='text-[30px] font-bold text-primary-500 mt-[45px] mb-[6px]'>
          Thông tin hiển thị trên thiết bị KIO_01
        </h2>
        <div className='px-8 py-6 text-left'>
          <h3 className='text-xl font-bold text-left text-primary-gray-500 mb-4'>
            Các lựa chọn cho khách hàng:
          </h3>
          <div className='grid grid-cols-3 gap-x-24 gap-y-5'>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Heart.png'
                    alt='logo_heart'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-red'>
                  <div className='leading-5'>Khám tim mạch</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Gynecological.png'
                    alt='logo_gynecological'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-pink'>
                  <div className='leading-5'>Khám sản - Phụ khoa</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Ear.png'
                    alt='ear_logo'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-organe'>
                  <div className='leading-5'>Khám tai mũi hong</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Teeth.png'
                    alt='teeth_logo'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-blue'>
                  <div className='leading-5'>Khám răng hàm mặt</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Lung.png'
                    alt='lung_logo'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-green'>
                  <div className='leading-5'>Khám hô hấp</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <div className='relative w-[260px] h-[170px] bg-white cursor-pointer rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.15)]'>
                <div className='flex justify-center items-center '>
                  <img
                    src='./images/Stethoscope.png'
                    alt='stethoscope_logo'
                    className='object-cover mt-4'
                  />
                </div>
                <div className='w-full text-center text-white flex justify-center items-center font-normal absolute bottom-0 left-0 pt-3 py-3 px-10 rounded-bl-xl rounded-br-xl bg-primary-purple'>
                  <div className='leading-5'>Khám tổng quát</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearLevelDevice;
