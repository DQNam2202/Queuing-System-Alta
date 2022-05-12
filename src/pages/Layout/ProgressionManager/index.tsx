import React, { useEffect, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
type Props = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '8%',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'tenKh',
    width: '15%',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDv',
    width: '15%',
  },
  {
    title: 'Thời gian cấp',
    dataIndex: 'tgCap',
    width: '18%',
  },
  {
    title: 'Hạn sử dụng',
    dataIndex: 'hsd',
    width: '18%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    render: (trangThai: any) =>
      trangThai === 'used' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-1 w-1 bg-primary-gray-300 rounded-full shrink-0'></span>
          Đã sử dụng
        </span>
      ) : trangThai === 'pending' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-1 w-1 bg-primary-blue rounded-full shrink-0'></span>
          Đang chờ
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-1 w-1 bg-primary-red rounded-full shrink-0'></span>
          Bỏ qua
        </span>
      ),
  },
  {
    title: 'Nguồn cấp',
    dataIndex: 'nguonCap',
    width: '10%',
  },
  {
    title: '',
    dataIndex: 'action2',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/progression-management/detail/${record.stt}`}
      >
        Chi tiết
      </Link>
    ),
  },
];
//Dropdown dịch vụ
const dataDV = [
  { title: 'Tất cả', value: 'all' },
  { title: 'Khám tim mach', value: 'timMach' },
  { title: 'Khám sản phụ khoa', value: 'phuKhoa' },
  { title: 'Khám răng hàm mặt', value: 'hamMat' },
  { title: 'Khám mắt', value: 'mat' },
  { title: 'Khám tai mũi họng', value: 'taiMuiHong' },
  { title: 'Khám da liễu', value: 'daLieu' },
  { title: 'Khám tiết niệu', value: 'tietNieu' },
  { title: 'Khám thần kinh', value: 'thanKinh' },
  { title: 'Khám hô hấp', value: 'hoHap' },
  { title: 'Khám tổng quát', value: 'tongQuat' },
];

const ProgressManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 3,
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
      let random = Math.floor(Math.random() * (3 - 1 + 1) + 0);

      let temp = {
        key: index,
        stt: `201000${index}`,
        tenKh: 'Nguyễn A 3',
        tenDv: `Khám tim mạch`,
        tgCap: `14:35 - 07/11/2021`,
        hsd: `14:35 - 10/11/2021`,
        nguonCap: index % 2 === 0 ? 'Kiosk' : 'Hệ thống',
        trangThai: random === 1 ? 'used' : random === 2 ? 'pending' : 'next',
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  const renderDropdownOption = (list: any) => {
    return list.map((item: any, index: number) => {
      return (
        <Option key={index} value={item.value}>
          {item.title}
        </Option>
      );
    });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[50px] xl:pr-2 xl:pl-2 md:pt-10 relative user-log'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Cấp số &gt;{' '}
        <span className='text-primary font-bold'>Danh sách cấp số</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý cấp số</h2>
      <div className='controls flex justify-between items-center lg:flex-col'>
        <div className='flex gap-x-2 md:flex-col md:items-center'>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Tên dịch vụ</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[150px] md:w-full'
            >
              {renderDropdownOption(dataDV)}
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Tình trạng</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[150px] md:w-full'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Đang chờ</Option>
              <Option value='offline'>Đã sử dụng</Option>
              <Option value='offline'>Bỏ qua</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Nguồn cấp</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={'Tất cả'}
              className='w-[150px] md:w-full'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Kiosk</Option>
              <Option value='offline'>Hệ thống</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Chọn thời gian</span>
            <div className='date-controls flex items-center'>
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-32 h-11 md:w-full'
                format={'DD/MM/YYYY'}
              />
              <CaretRightOutlined className='mx-1' />
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-32 h-11 md:w-full'
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
            className='w-[230px] md:w-full'
          />
        </div>
      </div>
      <div className='relative md:overflow-y-scroll md:h-96'>
        <Table
          className='mt-4 text-xs'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/progression-management/add'
          className='xl:relative xl:right-auto xl:top-auto xl:w-full absolute -right-16 top-0 flex flex-col h-[94px] w-14 p-1 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='text-sm'>Cấp số mới</span>
        </Link>
      </div>
    </div>
  );
};

export default ProgressManager;
