import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
type Props = {};
const { Option } = Select;

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
//Radom dummy data
const randomData = (()=>{
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
    return data
})()

//Render dropdown select
const renderDropdownSelect = (title : string,data : Array<any>)=>{
  return (
    <div className='flex items-center justify-between'>
    <span>{title}</span>
    <span className='h-[18px] flex flex-col items-center justify-center cursor-pointer'><CaretUpOutlined /><CaretDownOutlined className='-mt-[6px]' /></span>
    {/* Select */}
    {/* Using opacity to hidden selectbox only visible options */}
    <Select
    defaultValue={'Tất cả'}
    className='absolute top-0 left-0 w-full h-14 text-primary-gray-400 opacity-0'
  >
    {data && data.map((item,index)=><Option key={index} value={item.text}>{item.text}</Option>)}
  </Select>
    </div>
  )
}
//Render dropdown select
const renderDropdownSelectWithCheckbox = (title : string,data : Array<any>)=>{
  return (
    <div className='flex items-center justify-between'>
    <span>{title}</span>
    <span className='h-[18px] flex flex-col items-center justify-center cursor-pointer'><CaretUpOutlined /><CaretDownOutlined className='-mt-[6px]' /></span>
    {/* Select */}
    {/* Using opacity to hidden selectbox only visible options */}
    <Select
    defaultValue={'Tất cả'}
    className='absolute top-0 left-0 w-full h-14 text-primary-gray-400 opacity-0'
  >
    {data && data.map((item,index)=><Option key={index} value={item.text}><span className='flex items-center p-x-1'><span>{item.text}</span><input type="checkbox" className={ index !=0 ?`outline-primary-blue-300 outline-2 outline block ml-auto rounded-sm mr-1` : " hidden ml-auto rounded-sm mr-1"} /></span></Option>)}
  </Select>
    </div>
  )
}

//Slice array data
// DS STT
let dropdownDataStt = randomData.map(item=> {return {text: item.soThuTu}})
// DS t/g cap
let dropdownDataTime = randomData.map(item=> {return {text: item.thoiGianCap}})
// DS dv
let dropdownDataDV = dataDV.map(item=> {return {text: item.title}})
// DS status
let dropdownDataStatus = [{text: 'Tất cả'},{text: 'Đang chờ'},{text: 'Đã sử dụng'},{text: 'Bỏ qua'}]
// DS source
let dropdownDataSources = [{text: 'Tất cả'},{text: 'Kiosk'},{text: 'Hệ thống'}]
dropdownDataStt.unshift({text: 'Tất cả'})
dropdownDataTime.unshift({text: 'Tất cả'})
dropdownDataDV.unshift({text: 'Tất cả'})

//Structure table columns, rows data
const columns = [
  {
    title: () => { 
      return renderDropdownSelect('Số thứ tự',dropdownDataStt);
    },
    dataIndex: 'soThuTu',
    width: '20%',
  },
  {
    title: () => { 
      return renderDropdownSelectWithCheckbox('Tên dịch vụ',dropdownDataDV);
    },
    dataIndex: 'tenDv',
    width: '20%',
  },
  {
    title: () => { 
      return renderDropdownSelect('Thời gian cấp',dropdownDataTime);
    },
    dataIndex: 'thoiGianCap',
    width: '20%',
  },
  {
    title: () => { 
      return renderDropdownSelect('Tình trạng',dropdownDataStatus);
    },
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
    title: () => { 
      return renderDropdownSelect('Nguồn cấp',dropdownDataSources);
    },
    dataIndex: 'nguonCap',
    width: '20%',
  },
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
    const data = randomData

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] md:pr-2 relative report md:mt-3'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Báo cáo &gt; <span className='text-primary font-bold'>Lập báo cáo</span>
      </div>
      <div className='controls flex justify-between'>
        <div className='flex gap-x-2 md:w-full'>
          <div className='item flex flex-col md:w-full md:items-center'>
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
      <div className='relative md:flex-col'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <div className='md:relative md:right-auto md:top-auto md:w-full absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'>
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
