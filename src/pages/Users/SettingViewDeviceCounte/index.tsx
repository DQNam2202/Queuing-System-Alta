import React from 'react';
import './style.scss';
import { Select } from 'antd';
import { SettingOutlined, CaretDownOutlined } from '@ant-design/icons';
const SettingViewDevice = () => {
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
  const countreList = [
    'Quầy dịch vụ số 1',
    'Quầy dịch vụ số 2',
    'Quầy dịch vụ số 3',
    'Quầy dịch vụ số 4',
    'Quầy dịch vụ số 5',
    'Quầy dịch vụ số 6',
  ];
  const children = [];
  const countre = [];
  for (let i = 0; i < departmentList.length; i++) {
    children.push(<Option key={i}>{departmentList[i]}</Option>);
  }
  for (let i = 0; i < countreList.length; i++) {
    countre.push(<Option key={i}>{countreList[i]}</Option>);
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
        <div className='px-8 w-[500px] rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl font-bold text-primary-500 mt-[104px]'>
              Cài đặt thiết bị MHQ_01
            </h2>
          </div>
          <h3 className='text-xl font-bold text-center text-primary-gray-500 mb-4'>
            Vị trí thiết bị kết nối
          </h3>
          <Select
            suffixIcon={<CaretDownOutlined />}
            size={'large'}
            defaultValue={countre[0]}
            onChange={handleChange}
            className='w-full mb-8'
          >
            {countre}
          </Select>
          <h3 className='text-xl font-bold text-center text-primary-gray-500 mb-4'>
            Số thứ tự hiện thị dịch vụ
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

export default SettingViewDevice;
