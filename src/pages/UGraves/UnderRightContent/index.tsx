import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.scss';

function AdminRightContent() {
  let Option = Select.Option
  const [value, onChange] = useState(new Date());
  return (
    <div className='right__content w-1/3 pt-6 ml-2 h-screen max-h-screen xl:pt-16'>
      <h2 className='mb-6 text-primary font-semibold text-xl ml-2 mt-10'>
        Tổng quan
      </h2>
      <div className="filter-control flex items-center justify-around px-3 lg:flex-col lg:gap-y-2">
        <div className='selectBox flex items-start flex-col w-1/2 lg:items-center'>
                <span className='font-bold text-sm'>Theo tuần</span>
                <Select
                  defaultValue={'Chọn tuần'}
                  className='text-gray-500  w-[150px]'
                  suffixIcon={<CaretDownOutlined className='text-primary' />}
                >
                  <Option value='week1'>1</Option>
                  <Option value='week2'>2</Option>
                  <Option value='week3'>3</Option>
                  <Option value='week4'>4</Option>
                </Select>
              </div>
              <div className='selectBox flex items-start flex-col  w-1/2 lg:items-center'>
                <span className='font-bold text-sm'>Theo tháng</span>
                <Select
                  defaultValue={'Chọn tháng'}
                  className='text-gray-500 w-[150px]'
                  suffixIcon={<CaretDownOutlined className='text-primary' />}
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map((item:Number,index:Number)=>{
                    return <Option value={item} key={index.toString()}>{item.toString()}</Option>
                  })}
                </Select>
              </div>
        </div>
      <div className='px-3 mt-2'>
        <Calendar
          onChange={onChange}
          value={value}
          className='text-xs rounded-2xl w-full'
        />
      </div>
      <div className="px-3 mt-3 w-full flex">
        <h2 className='w-2/6 text-lg'>Chú thích</h2>
        <div className="w-4/6 flex items-start flex-col">
          <div className="item flex items-center gap-x-5">
            <div className="h-8 w-11 object-cover">
              <img src="./images/svgs/chart-1.svg" alt='asd' className='w-full h-full' />
            </div>
            <span className='text-xs'>Số thứ tự đã cấp</span>
          </div>
          <div className="item flex items-center gap-x-5">
            <div className="h-8 w-11 object-cover">
              <img src="./images/svgs/chart-2.svg" alt='asd' className='w-full h-full' />
            </div>
            <span className='text-xs'>Số thứ tự đã sử dụng</span>
          </div>
          <div className="item flex items-center gap-x-5">
            <div className="h-8 w-11 object-cover">
              <img src="./images/svgs/chart-3.svg" alt='asd' className='w-full h-full' />
            </div>
            <span className='text-xs'>Số thứ tự đã bỏ qua</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRightContent;
