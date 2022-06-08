import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IService from '../../../db/types/service.type';
import IDevice from '../../../db/types/device.type';
import IProgression, { Status } from '../../../db/types/progression.type';
import './style.scss';
const values = [
  { fill: '#FF7506', percent: 60 },
  { fill: '#7E7D88', percent: 40 },
  { fill: '#35C75A', percent: 15 },
];
type Props = {
  services: IService[];
  devices: IDevice[];
  progressions: IProgression[];
  handleChangeDate: Function;
};

function AdminRightContent(props: Props) {
  const { services, devices, progressions, handleChangeDate } = props;

  const [value, onChange] = useState(new Date());
  const [detailService, setDetailService] = useState<any>();
  const [detailDevice, setDetailDevice] = useState<any>();
  const [detailProgression, setDetailProgression] = useState<any>();
  const handleGetDateChange = (value: any, event: any) => {
    onChange(value);
    handleChangeDate(value);
  };

  useEffect(() => {
    // Status Activy Service
    const dataService = {
      online: services.filter(ser => ser.trangThai === true).length,
      offline: services.filter(ser => ser.trangThai === false).length,
      values: [
        {
          fill: '#4277FF',
          percent: parseInt(
            (
              (services.filter(item => item.trangThai === true).length /
                services.length) *
              100
            ).toFixed(2),
          ),
        },
        {
          fill: '#7E7D88',
          percent: parseInt(
            (
              (services.filter(item => item.trangThai === false).length /
                services.length) *
              100
            ).toFixed(2),
          ),
        },
      ].sort((a, b) => b.percent - a.percent),
    };
    setDetailService(dataService);
    // Status Activity Device
    const dataDevice = {
      online: devices.filter(ser => ser.trangThaiHoatDong === true).length,
      offline: devices.filter(ser => ser.trangThaiHoatDong === false).length,
      values: [
        {
          fill: '#4277FF',
          percent: parseInt(
            (
              (devices.filter(item => item.trangThaiHoatDong === true).length /
                devices.length) *
              100
            ).toFixed(2),
          ),
        },
        {
          fill: '#7E7D88',
          percent: parseInt(
            (
              (devices.filter(item => item.trangThaiHoatDong === false).length /
                devices.length) *
              100
            ).toFixed(2),
          ),
        },
      ].sort((a, b) => b.percent - a.percent),
    };
    setDetailDevice(dataDevice);
    // Status Activity Device
    const dataProgression = {
      online: progressions.filter(ser => ser.trangThai === Status.USED).length,
      offline: progressions.filter(ser => ser.trangThai === Status.PENDING)
        .length,
      remove: progressions.filter(ser => ser.trangThai === Status.REMOVE)
        .length,
      values: [
        {
          fill: '#4277FF',
          percent: parseInt(
            (
              (progressions.filter(item => item.trangThai === Status.USED)
                .length /
                progressions.length) *
              100
            ).toFixed(2),
          ),
        },
        {
          fill: '#7E7D88',
          percent: parseInt(
            (
              (progressions.filter(item => item.trangThai === Status.PENDING)
                .length /
                progressions.length) *
              100
            ).toFixed(2),
          ),
        },
        {
          fill: '#35C75A',
          percent: parseInt(
            (
              (progressions.filter(item => item.trangThai === Status.REMOVE)
                .length /
                progressions.length) *
              100
            ).toFixed(2),
          ),
        },
      ].sort((a, b) => b.percent - a.percent),
    };
    setDetailProgression(dataProgression);
  }, [services, devices, progressions]);

  return (
    <div className='right__content w-1/3 pt-6 ml-2 h-screen max-h-screen xl:pt-16'>
      <h2 className='mb-6 text-primary font-semibold text-xl ml-2'>
        Tổng quan
      </h2>
      <div className='flex flex-col items-center w-full gap-y-2 px-3'>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full items-center flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {detailDevice?.values.map((item: any, index: any) => (
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
                    14 - index * 3
                  } w-${14 - index * 3}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>
                {devices.length}
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
              <span className='text-sm font-bold text-[#FF7506]'>
                {detailDevice?.online}
              </span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-500 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#FF7506]'>
                {detailDevice?.offline}
              </span>
            </div>
          </div>
        </div>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full items-center flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {detailService?.values.map((item: any, index: any) => (
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
                    14 - index * 3
                  } w-${14 - index * 3}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>
                {services.length}
              </div>
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
              <span className='text-sm font-bold text-[#0640ff]'>
                {detailService?.online}
              </span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-600 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#0640ff]'>
                {detailService?.offline}
              </span>
            </div>
          </div>
        </div>
        <div className='shadow-circle shadow-gray-300 rounded-xl px-3 py-2 w-full  flex justify-between gap-x-5 xl:flex-col'>
          <div className='circles flex justify-between gap-x-2 items-center xl:w-full'>
            <div className='cirlce relative h-14 w-14'>
              {detailProgression?.values.map((item: any, index: any) => (
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
                    14 - index * 3
                  } w-${14 - index * 3}`}
                />
              ))}
            </div>
            <div className='name'>
              <div className='number font-bold text-lg text-[#535261] xl:text-right'>
                {progressions.length}
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
              <span className='text-sm font-bold text-[#35C75A]'>
                {detailProgression?.online}
              </span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-gray-600 rounded-full'></span>
                Ngưng hoạt động
              </div>
              <span className='text-sm font-bold text-[#35C75A]'>
                {detailProgression?.offline}
              </span>
            </div>
            <div className='flex items-center justify-between gap-x-2'>
              <div className='text-xs flex items-center gap-x-1'>
                <span className='h-1 w-1 block bg-[#F178B6] rounded-full'></span>
                Bỏ qua
              </div>
              <span className='text-sm font-bold text-[#35C75A]'>
                {detailProgression?.remove}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='px-3 mt-2'>
        <Calendar
          onChange={handleGetDateChange}
          value={value}
          className='text-xs rounded-2xl w-full'
        />
      </div>
    </div>
  );
}

export default AdminRightContent;
