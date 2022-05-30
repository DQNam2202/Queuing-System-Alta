import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.scss';
type Props = {};

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDangNhap',
    width: '10%',
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    width: '15%',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'soDienThoai',
    width: '14%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Vai trò',
    dataIndex: 'vaiTro',
    width: '10%',
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
        to={`/user-management/update/${record.tenDangNhap}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const UserManager = (props: Props) => {
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
      const randomPhone = Math.floor(Math.random() * 1000000000);
      let temp = {
        key: index,
        tenDangNhap: `tuyetnguyen@1${index}`,
        hoTen: `Nguyễn Văn ${(index + 9).toString(36).toUpperCase()}`,
        soDienThoai: randomPhone,
        email: 'tuyetnguyen123@gmail.com',
        vaiTro: 'Kế toán',
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
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:mt-3 relative user'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Cài đặt hệ thống &gt;{' '}
        <span className='text-primary font-bold'>Quản lý tài khoản</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>
        Danh sách tài khoản
      </h2>
      <div className='controls flex justify-between md:flex-col md:items-center md:mb-3'>
        <div className='flex gap-x-2'>
          <div className='item flex flex-col text-sm md:items-center'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Tên vai trò
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='keToan'>Kế toán</Option>
              <Option value='manager'>Quản lý</Option>
              <Option value='admin'>Admin</Option>
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base md:items-center mt-2'>
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
      <div className='relative md:overflow-y-scroll md:max-h-[60vh]'>
        <Table
          className='mt-4 overflow-x-scroll'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/user-management/add'
          className='lg:relative lg:top-auto lg:right-auto lg:w-full absolute -right-28 px-3 py-1 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='font-semibold text-sm leading-[19px]'>
            Thêm tài khoản
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserManager;
