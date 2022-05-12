import React, { useEffect, useState } from 'react';
import { DatePicker, Input } from 'antd';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
type Props = {};

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDangNhap',
    width: '25%',
  },
  {
    title: 'Thời gian tác động',
    dataIndex: 'thoiGian',
    width: '20%',
  },
  {
    title: 'IP thực hiện',
    dataIndex: 'ip',
    width: '20%',
  },
  {
    title: 'Thao tác thực hiện',
    dataIndex: 'thaoTac',
    width: '35%',
  },
];
const UserLog = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });
  const handleDateChange = (date: any, dateString: String) => {
    console.log(date, dateString);
  };
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let temp = {
        key: index,
        tenDangNhap: 'tuyetnguyen@12',
        thoiGian: '01/12/2021 15:12:17',
        ip: '192.168.3.1',
        thaoTac: 'Cập nhật thông tin dịch vụ DV_01',
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] md:mt-3 lg:pr-2 relative user-log'>
      <div className='path text-primary-gray-light-400 font-bold text-lg mb-11'>
        Cài đặt hệ thống &gt;{' '}
        <span className='text-primary font-bold'>Nhật ký hoạt động</span>
      </div>
      <div className='controls flex justify-between items-center md:flex-col'>
        <div className='flex gap-x-2'>
          <div className='item flex flex-col md:items-center'>
            <span className='font-semibold text-base leading-6 mb-1 text-primary-gray-500'>
              Chọn thời gian
            </span>
            <div className='date-controls '>
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11'
                format={'DD/MM/YYYY'}
              />
              <CaretRightOutlined className='mx-2' />
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
              />
            </div>
          </div>
        </div>
        <div className='item flex flex-col text-base md:items-center'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onSearch={value => console.log(value)}
            className='w-[300px] h-11 text-primary-gray-400'
          />
        </div>
      </div>
      <div className='relative'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
      </div>
    </div>
  );
};

export default UserLog;
