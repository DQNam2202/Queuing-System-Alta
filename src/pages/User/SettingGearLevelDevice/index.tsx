import React from 'react';
import './style.scss';
import { Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const SettingGearDevice = () => {
  const { Option } = Select;

  const departmentList = [
    'Khám tim mach',
    'Khám sản phụ khoa',
    'Khám răng hàm mặt',
    'Khám mắt',
    'Khám tai mũi họng',
    'Khám da liễu',
    'Khám tiết niệu',
    'Khám thần kinh',
    'Khám hô hấp',
    'Khám tổng quát',
  ];
  const children = [];
  for (let i = 0; i < departmentList.length; i++) {
    children.push(<Option key={i}>{departmentList[i]}</Option>);
  }
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  return (
    <div className=''>
      {/* Logo */}
      <div className='fixed top-5 left-12'>
        <div className='w-[60px] h-[48px]'>
          <img
            src='./images/Logo_alta.png'
            alt='Logo_Alta'
            className='w-full h-full object-cover'
          />
          <div className='fixed top-5 right-12'>
            <button
              type='submit'
              className='flex justify-center items-center gap-x-3 bg-primary-organe-50 py-3 pl-[14.5px] pr-[76px] rounded-lg'
            >
              <img src='./images/fi_log-out.png' alt='icon-logout' />
              <span className='text-primary text-base font-semibold leading-6'>
                Log out
              </span>
            </button>
          </div>
          <div className='fixed top-[29%] right-0'>
            <button
              type='submit'
              className='flex flex-col justify-center items-center bg-primary-organe-50 p-4 rounded-lg'
            >
              <div className='w-[23px] h-[23px] bg-primary flex justify-center items-center rounded-md text-white'>
                <SettingOutlined />
              </div>
              <span className='text-primary text-base font-semibold leading-6 mt-1'>
                Cài đặt
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Content */}

      <div className='flex items-center justify-center'>
        <div className='px-8 w-[1024px] rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl font-bold text-primary-500 mt-[104px]'>
              Cài đặt thiết bị KIO_01
            </h2>
          </div>
          <h3 className='text-xl font-bold text-left text-primary-gray-500 mb-4'>
            Các lựa chọn hiển thị:
          </h3>
          <Select
            mode='multiple'
            size='large'
            onChange={handleChange}
            className='w-full'
          >
            {children}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SettingGearDevice;
