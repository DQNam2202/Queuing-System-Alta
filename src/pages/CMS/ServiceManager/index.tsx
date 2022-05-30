import React, { useEffect, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
type Props = {};

const columns = [
  {
    title: 'Mã dịch vụ',
    dataIndex: 'maDv',
    width: '20%',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDv',
    width: '20%',
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    width: '20%',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThai',
    render: (trangThai: any) =>
      trangThai ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full'></span>{' '}
          Hoạt động
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full'></span>
          Ngưng hoạt động
        </span>
      ),
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/services-management/detail/${record.maDv}`}
      >
        Chi tiết
      </Link>
    ),
  },
  {
    title: '',
    dataIndex: 'action2',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/services-management/update/${record.maDv}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const ServiceManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const handleDateChange = (date: any, dateString: String) => {
    console.log(date, dateString);
  };
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let temp = {
        key: index,
        maDv: `KIO_0${index}`,
        tenDv: `Kiosk ${index}`,
        moTa: `Mô tả ${index}`,
        trangThai: index % 2 === 0 ? true : false,
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 relative service'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Dịch vụ &gt;{' '}
        <span className='text-primary font-bold'>Danh sách dịch vụ</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý dịch vụ</h2>
      <div className='controls flex justify-between md:flex-col md:items-center'>
        <div className='flex gap-x-2 xl:flex-col '>
          <div className='item flex flex-col text-sm'>
            <span className='font-semibold'>Trạng thái hoạt động</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Hoạt động</Option>
              <Option value='offline'>Ngưng hoạt động</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-sm xl:mt-2'>
            <span className='font-semibold'>Chọn thời gian</span>
            <div className='date-controls'>
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
              />
              <CaretRightOutlined className='' />
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
              />
            </div>
          </div>
        </div>
        <div className='item flex flex-col text-sm'>
          <span className='font-semibold'>Từ khoá</span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onSearch={value => console.log(value)}
            className='w-[300px] h-11 text-primary-gray-400'
          />
        </div>
      </div>
      <div className='relative flex-col'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/services-management/add'
          className='lg:relative lg:w-full lg:top-auto lg:right-auto absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='text-sm'>Thêm dịch vụ</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceManager;
