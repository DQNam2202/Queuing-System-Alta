import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
type Props = {};

const columns = [
  {
    title: 'Mã thiết bị',
    dataIndex: 'maThietBi',
    width: '12%',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'tenThietBi',
    width: '12%',
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'ip',
    width: '10%',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThai',
    width: '18%',
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
    title: 'Trạng thái kết nối',
    dataIndex: 'ketNoi',
    width: '15%',
    render: (ketNoi: any) =>
      ketNoi ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full'></span>{' '}
          Kết nối
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full'></span>
          Mất kết nối
        </span>
      ),
  },
  {
    title: 'Dịch vụ sử dụng',
    dataIndex: 'dichVuSuDung',

    render: (dichVuSuDung: any) => {
      let item = dichVuSuDung.join(',');
      return (
        <div>
          <span className='limit-1 w-16'>{item}</span>
          <strong className='underline text-primary-blue cursor-pointer'>
            Xem thêm
          </strong>
        </div>
      );
    },
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/devices-management/detail/${record.maThietBi}`}
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
        to={`/devices-management/update/${record.maThietBi}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const DeviceManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 9,
    },
    loading: false,
  });
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let temp = {
        key: index,
        maThietBi: `KIO_0${index}`,
        tenThietBi: `Kiosk ${index}`,
        ip: '192.168.1.10',
        trangThai: index % 2 === 0 ? true : false,
        ketNoi: index % 2 === 0 ? true : false,
        dichVuSuDung: [
          'Khám tim mạch',
          'Khám Sản - Phụ khoa',
          'Khám răng hàm mặt',
          'Khám tai mũi họng',
          'Khám hô hấp',
          'Khám tổng quát',
        ],
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative device lg:pr-1'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-11'>
        Thiết bị &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Danh sách thiết bị
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold mb-4'>
        Quản lý thiết bị
      </h2>
      <div className='controls flex justify-between lg:flex-col lg:gap-y-3 md:justify-center md:items-center'>
        <div className='flex gap-x-6  md:flex-col'>
          <div className='item flex flex-col text-base'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Trạng thái hoạt động
            </span>
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
          <div className='item flex flex-col text-base'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Trạng thái kết nối
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='connect'>Kết nối</Option>
              <Option value='disconnect'>Mất kết nối</Option>
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base'>
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
      <div className='relative xl:flex xl:flex-col'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/devices-management/add'
          className='xl:relative xl:right-auto xl:top-auto xl:w-full absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='font-semibold text-sm leading-[19px]'>
            Thêm thiết bị
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DeviceManager;
