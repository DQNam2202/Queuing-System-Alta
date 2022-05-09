import React, { useEffect, useState } from 'react';
import { DatePicker, Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
type Props = {};

const columns = [
  {
    title: 'Số thứ tự',
    dataIndex: 'soThuTu',
    width: '20%',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDv',
    width: '20%',
  },
  {
    title: 'Thời gian cấp',
    dataIndex: 'thoiGianCap',
    width: '20%',
  },
  {
    title: 'Tình Trạng',
    dataIndex: 'tinhTrang',
    render: (tinhTrang: any) =>
      tinhTrang === 'used' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-gray-300 rounded-full shrink-0'></span>
          Đã sử dụng
        </span>
      ) : tinhTrang === 'pending' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-blue rounded-full shrink-0'></span>
          Đang chờ
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full shrink-0'></span>
          Bỏ qua
        </span>
      ),
  },
  {
    title: 'Nguồn cấp',
    dataIndex: 'nguonCap',
    width: '20%',
  },
];
const dataDV = [
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
const ReportManager = (props: Props) => {
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
      let random = Math.floor(Math.random() * (3 - 1 + 1) + 0);
      let randomDV = Math.floor(Math.random() * dataDV.length);
      let temp = {
        key: index,
        soThuTu: `201000${index}`,
        tenDv: dataDV[randomDV].title,
        thoiGianCap: '07:20 - 04/05/2022',
        moTa: `Mô tả ${index}`,
        tinhTrang: random === 1 ? 'used' : random === 2 ? 'pending' : 'next',
        nguonCap: index % 2 === 0 ? 'Kiosk' : 'Hệ thống',
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative report'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Báo cáo &gt; <span className='text-primary font-bold'>Lập báo cáo</span>
      </div>
      <div className='controls flex justify-between'>
        <div className='flex gap-x-2'>
          <div className='item flex flex-col'>
            <span className='font-semibold text-base leading-6 text-primary-gray-500 mb-1'>
              Chọn thời gian
            </span>
            <div className='date-controls'>
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11 px-4 py-2'
                format={'DD/MM/YYYY'}
              />
              <CaretRightOutlined className='mx-2' />
              <DatePicker
                onChange={handleDateChange}
                className='rounded-lg w-[150px] h-11 px-4 py-2'
                format={'DD/MM/YYYY'}
              />
            </div>
          </div>
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
        {/* Add button */}
        <div className='absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'>
          <Link
            to=''
            className='flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
          >
            <div className='w-5 h-5'>
              <img src='/images/svgs/icon-download.svg' alt='' />
            </div>
            <span className='text-sm'>Tải về</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportManager;
