import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.scss';
const values = [
  { fill: '#FF7506', percent: 60 },
  { fill: '#7E7D88', percent: 40 },
  { fill: '#35C75A', percent: 15 },
];
function AdminRightContent() {
  const [value, onChange] = useState(new Date());
  return (
    <div className='right__content w-1/3 pt-6 ml-2 h-screen max-h-screen xl:pt-16'>
      <h2 className='mb-6 text-primary font-semibold text-xl ml-2'>
        Tổng quan
      </h2>
      <div className='flex flex-col items-center w-full gap-y-2 px-3'>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full items-center flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {values.map((item, index) => (
                <CircularProgressbar
                  key={index}
                  text={
                    item.percent == values[0].percent
                      ? `${item.percent}%`
                      : ""
                  }
                  strokeWidth={5}
                  styles={{
                    path: { stroke: item.fill },
                    trail: { stroke: "#EAEAEC" },
                    text: { stroke: "#000", fontSize: "24px" },
                  }}
                  value={item.percent}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-${
                    14 - index * 2
                  } w-${14 - index * 2}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>
                4.221
              </div>
              <span className='text-sm text-[#FF7506] font-medium'>
                <i className='fa fa-desktop'></i> Thiết bị
              </span>
            </div>
          </div>
          <div className='detail flex flex-col gap-y-1 xl:w-full'>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-yellow-300 rounded-full'></span>
                Đang hoạt động
              </div>
              <span className='text-sm font-bold text-[#FF7506]'>3.799</span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-500 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#FF7506]'>422</span>
            </div>
          </div>
        </div>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full items-center flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {values.map((item, index) => (
                <CircularProgressbar
                key={index}
                  text={
                    item.percent === values[0].percent ? `${item.percent}%` : ''
                  }
                  strokeWidth={5}
                  styles={{
                    path: { stroke: item.fill },
                    trail: { stroke: '#EAEAEC' },
                    text: { stroke: '#000', fontSize: '24px' },
                  }}
                  value={item.percent}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-${
                    14 - index * 2
                  } w-${14 - index * 2}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>276</div>
              <span className='text-sm text-[#0640ff] font-medium'>
                <i className='fa fa-desktop'></i> Dịch vụ
              </span>
            </div>
          </div>
          <div className='detail flex flex-col gap-y-1 xl:w-full'>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-yellow-300 rounded-full'></span>
                Đang hoạt động
              </div>
              <span className='text-sm font-bold text-[#0640ff]'>210</span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-600 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#0640ff]'>66</span>
            </div>
          </div>
        </div>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full  flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {values.map((item, index) => (
                <CircularProgressbar
                key={index}
                  text={
                    item.percent === values[0].percent ? `${item.percent}%` : ''
                  }
                  strokeWidth={5}
                  styles={{
                    path: { stroke: item.fill },
                    trail: { stroke: '#EAEAEC' },
                    text: { stroke: '#000', fontSize: '24px' },
                  }}
                  value={item.percent}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-${
                    14 - index * 2
                  } w-${14 - index * 2}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>
                4.221
              </div>
              <span className='text-sm text-[#35C75A] font-medium'>
                <i className='fa fa-desktop'></i> Cấp số
              </span>
            </div>
          </div>
          <div className='detail flex flex-col gap-y-1 xl:w-full'>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-yellow-300 rounded-full'></span>
                Đang hoạt động
              </div>
              <span className='text-sm font-bold text-[#35C75A]'>3.721</span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-600 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#35C75A]'>486</span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-[#F178B6] rounded-full'></span>
                Bỏ qua
              </div>
              <span className='text-sm font-bold text-[#35C75A]'>32</span>
            </div>
          </div>
        </div>
      </div>
      <div className='px-3 mt-2'>
        <Calendar
          onChange={onChange}
          value={value}
          className='text-xs rounded-2xl w-full'
        />
      </div>
    </div>
  );
}

export default AdminRightContent;
