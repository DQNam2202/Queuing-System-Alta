import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import ServiceServices from '../../../db/services/service.services';
import IService from '../../../db/types/service.type';
import moment from 'moment-timezone';
type Props = {};

const columns = [
  {
    title: 'Mã dịch vụ',
    dataIndex: 'maDichVu',
    width: '20%',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDichVu',
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
        to={`/services-management/detail/${record.id}`}
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
        to={`/services-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const ServiceManager = (props: Props) => {
  const [key, setKey] = useState('');
  const [services, setServices] = useState<IService[]>([]);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
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
    if (value === 'all') {
      let temp = services.filter(
        item =>
          xoa_dau(item.maDichVu.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.moTa.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.tenDichVu.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ),
      );

      setTable({ ...table, data: temp as any });
      return;
    } else {
      let active = value === 'online' ? true : false;
      console.log(services);
      let temp = services.filter(
        item =>
          (xoa_dau(item.maDichVu.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
            xoa_dau(item.moTa.toLocaleLowerCase()).includes(
              xoa_dau(key.toLocaleLowerCase()),
            ) ||
            xoa_dau(item.tenDichVu.toLocaleLowerCase()).includes(
              xoa_dau(key.toLocaleLowerCase()),
            )) &&
          item.trangThai === active,
      );
      setTable({ ...table, data: temp as any });
    }
  }
  useEffect(() => {
    (async () => {
      let data = await ServiceServices.getService();
      data = data.map(item => {
        //Format vai tro
        return {
          ...item,
          key: item.id,
        };
      });
      setServices(data);
      setTable({ ...table, data: data as any });
    })();
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  const xoa_dau = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  };
  const handleKeyWordChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setKey(value);
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = services.filter(
        item =>
          xoa_dau(item.maDichVu.toLocaleLowerCase()).includes(
            xoa_dau(value.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.moTa.toLocaleLowerCase()).includes(
            xoa_dau(value.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.tenDichVu.toLocaleLowerCase()).includes(
            xoa_dau(value.toLocaleLowerCase()),
          ),
      );

      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };
  const handleDateChange = (start: any, end: any) => {
    // let temp = logs.filter((log)=>{
    //   let temp = log.actionTime as any
    //   return  moment(temp.toDate()) >= start && moment(temp.toDate()) <= end || moment(temp.toDate()).isSame(end,'day') || moment(temp.toDate()).isSame(start,'day')
    // }).filter(item=>
    //   xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
    //   ||  xoa_dau(item.action.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
    //   || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
    //   || xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
    //   )
    //   setTable({...table,data : temp as any})
  };

  const handleStartDateChange = (date: any, dateString: String) => {
    let temp = date.clone();
    if (date > time.endDay) {
      setTime({ startDay: temp, endDay: date.add(7, 'days') });
      handleDateChange(temp, date);
    } else {
      setTime({ ...time, startDay: temp });
      handleDateChange(temp, time.endDay);
    }
  };
  const handleEndDateChange = (date: any, dateString: String) => {
    setTime({ ...time, endDay: date });
    handleDateChange(time.startDay, date);
  };
  function disabledDate(current: any) {
    return current < time.startDay;
  }

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
              defaultValue={'all'}
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
                onChange={handleStartDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                value={time.startDay}
              />
              <CaretRightOutlined className='' />
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                value={time.endDay}
              />
            </div>
          </div>
        </div>
        <div className='item flex flex-col text-sm'>
          <span className='font-semibold'>Từ khoá</span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onChange={handleKeyWordChange}
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
