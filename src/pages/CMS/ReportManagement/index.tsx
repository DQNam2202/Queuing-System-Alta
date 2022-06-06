import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Table } from 'antd';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import ServiceServices from '../../../db/services/service.services';
import IService from '../../../db/types/service.type';
import ProgressionServices from '../../../db/services/progression.services';
import IProgression from '../../../db/types/progression.type';
import moment from 'moment-timezone';
// Export excel file
import { CSVLink } from 'react-csv';
type Props = {};
const { Option } = Select;
interface IDropdown {
  text: string;
  key: string;
}
const ReportManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });
  const [progressions, setProgressions] = useState<IProgression[]>([]);
  const [dropdownDataStt, setDropdownDataStt] = useState<IDropdown[]>([]);
  const [dropdownDataTime, setDropdownDataTime] = useState<IDropdown[]>([]);
  const [dropdownDataDV, setDropdownDataDV] = useState<any[]>([]);
  const [dropdownDataStatus, setDropdownDataStatus] = useState<IDropdown[]>([]);
  const [dropdownDataSources, setDropdownDataSources] = useState<IDropdown[]>(
    [],
  );
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
  const [filterOptions, setFilterOptions] = useState({
    sttSelect: 'all',
    timeSelect: 'all',
    serviceSelect: [],
    statusSelect: 'all',
    sourceSelect: 'all',
  });
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let data = await ProgressionServices.getProgression();
      let services = await ServiceServices.getService();
      data = data.map(item => {
        let temp = services.find(ser => ser.id === item.dichVu);
        return {
          ...item,
          key: item.id,
          tenDichVu: temp?.tenDichVu,
        };
      });
      setProgressions(data);

      // DS STT
      let dropdownDataStt = data.map(item => {
        return { text: item.stt, key: item.stt };
      });
      // DS t/g cap
      let dropdownDataTime = data.map(item => {
        let temp: any = { ...item.thoiGianCap };
        let time = new Date(temp.seconds * 1000);
        let timeFormat = moment(time.toLocaleString())
          .tz('Asia/Ho_Chi_Minh')
          .format('HH:mm - DD/MM/YYYY ');
        return { text: timeFormat, key: time.toLocaleString() };
      });
      // DS dv
      let dropdownDataDV = services.map(item => {
        return { text: item.tenDichVu, key: item.id };
      });
      // DS status
      let dropdownDataStatus = [
        { text: 'Tất cả', key: 'all' },
        { text: 'Đang chờ', key: 'pending' },
        { text: 'Đã sử dụng', key: 'used' },
        { text: 'Bỏ qua', key: 'removed' },
      ];
      // DS source
      let dropdownDataSources = [
        { text: 'Tất cả', key: 'all' },
        { text: 'Kiosk', key: 'Kiosk' },
        { text: 'Hệ thống', key: 'Hệ thống' },
      ];
      dropdownDataStt.unshift({ text: 'Tất cả', key: 'all' });
      dropdownDataTime.unshift({ text: 'Tất cả', key: 'all' } as any);
      dropdownDataDV.unshift({ text: 'Tất cả', key: 'all' });
      setDropdownDataDV(dropdownDataDV);
      setDropdownDataSources(dropdownDataSources);
      setDropdownDataStatus(dropdownDataStatus);
      setDropdownDataStt(dropdownDataStt);
      setDropdownDataTime(dropdownDataTime);
      setTable({ ...table, data: data as any });
    })();
  }, []);
  useEffect(() => {
    if (table.data) {
      //Format excel
      let headers = [
        { label: 'STT', key: 'stt' },
        { label: 'Tên dịch vụ', key: 'tenDichVu' },
        { label: 'Thời gian cấp', key: 'thoiGianCap' },
        { label: 'Tình trạng', key: 'trangThai' },
        { label: 'Nguồn cấp', key: 'nguonCap' },
      ];
      let data = table.data.map((item: any) => {
        return {
          ...item,
          thoiGianCap: moment(item.thoiGianCap.toDate())
            .tz('Asia/Ho_Chi_Minh')
            .format('HH:mm - DD/MM/YYYY '),
          trangThai:
            item.trangThai === 'used'
              ? 'Đã sử dụng'
              : item.trangThai === 'removed'
              ? 'Bỏ quả'
              : 'Đang chờ',
        };
      });
      setHeaders(headers);
      setCsvData(data);
    }
  }, [table]);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  //Render dropdown select
  const renderDropdownSelect = (
    name: string,
    title: string,
    data: Array<any>,
  ) => {
    return (
      <div className='flex items-center justify-between'>
        <span>{title}</span>
        <span className='h-[18px] flex flex-col items-center justify-center cursor-pointer'>
          <CaretUpOutlined />
          <CaretDownOutlined className='-mt-[6px]' />
        </span>
        {/* Select */}
        {/* Using opacity to hidden selectbox only visible options */}
        <Select
          defaultValue={'Tất cả'}
          className='absolute top-0 left-0 w-full h-14 text-primary-gray-400 opacity-0'
          onChange={e => {
            handleDefaultDropdownChange(name, e);
          }}
        >
          {data &&
            data.map((item, index) => (
              <Option key={item.key}>{item.text}</Option>
            ))}
        </Select>
      </div>
    );
  };
  //Render dropdown select
  const renderDropdownSelectWithCheckbox = (
    title: string,
    data: Array<any>,
  ) => {
    return (
      <div className='flex items-center justify-between'>
        <span>{title}</span>
        <span className='h-[18px] flex flex-col items-center justify-center cursor-pointer'>
          <CaretUpOutlined />
          <CaretDownOutlined className='-mt-[6px]' />
        </span>
        {/* Select */}
        {/* Using opacity to hidden selectbox only visible options */}
        <Select
          defaultValue={'Tất cả'}
          className='absolute top-0 left-0 w-full h-14 text-primary-gray-400 opacity-0'
        >
          {data &&
            data.map((item, index) => (
              <Option key={item.key}>
                <span className='flex items-center p-x-1'>
                  <span>{item.text}</span>
                  <input
                    value={item.key}
                    onChange={handleServicesChange}
                    type='checkbox'
                    className={
                      index != 0
                        ? `outline-primary-blue-300 outline-2 outline block ml-auto rounded-sm mr-1`
                        : ' hidden ml-auto rounded-sm mr-1'
                    }
                  />
                </span>
              </Option>
            ))}
        </Select>
      </div>
    );
  };
  //Structure table columns, rows data
  const renderCollumns = (
    dropdownDataStt: any,
    dropdownDataDV: any,
    dropdownDataTime: any,
    dropdownDataStatus: any,
  ) => {
    return [
      {
        title: () => {
          return renderDropdownSelect(
            'sttSelect',
            'Số thứ tự',
            dropdownDataStt,
          );
        },
        dataIndex: 'stt',
        width: '20%',
      },
      {
        title: () => {
          return renderDropdownSelectWithCheckbox(
            'Tên dịch vụ',
            dropdownDataDV,
          );
        },
        dataIndex: 'tenDichVu',
        width: '20%',
      },
      {
        title: () => {
          return renderDropdownSelect(
            'timeSelect',
            'Thời gian cấp',
            dropdownDataTime,
          );
        },
        dataIndex: 'thoiGianCap',
        width: '20%',
        render: (thoiGianCap: any) => {
          return (
            <span>
              {moment(thoiGianCap.toDate())
                .tz('Asia/Ho_Chi_Minh')
                .format('HH:mm - DD/MM/YYYY')}
            </span>
          );
        },
      },
      {
        title: () => {
          return renderDropdownSelect(
            'statusSelect',
            'Tình trạng',
            dropdownDataStatus,
          );
        },
        dataIndex: 'trangThai',
        render: (trangThai: any) =>
          trangThai === 'used' ? (
            <span className='flex items-center gap-x-2'>
              <span className='block h-2 w-2 bg-primary-gray-300 rounded-full shrink-0'></span>
              Đã sử dụng
            </span>
          ) : trangThai === 'pending' ? (
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
          return renderDropdownSelect(
            'sourceSelect',
            'Nguồn cấp',
            dropdownDataSources,
          );
        },
        dataIndex: 'nguonCap',
        width: '20%',
      },
    ];
  };
  const handleDefaultDropdownChange = (name: string, value: any) => {
    console.log(name + '-------->', value);
    let nguonCap =
      filterOptions.sourceSelect === 'all' ? '' : filterOptions.sourceSelect;
    let tinhTrang =
      filterOptions.statusSelect === 'all' ? '' : filterOptions.statusSelect;
    let stt = filterOptions.sttSelect === 'all' ? '' : filterOptions.sttSelect;
    let timePicked =
      name !== 'timeSelect'
        ? filterOptions.timeSelect === 'all'
          ? ''
          : filterOptions.timeSelect
        : value;

    let temp;
    if (timePicked === '') {
      temp = progressions.filter(log => {
        let temp = log.thoiGianCap as any;
        return (
          (moment(temp.toDate()) >= time.startDay &&
            moment(temp.toDate()) <= time.endDay) ||
          moment(temp.toDate()).isSame(time.endDay, 'day') ||
          moment(temp.toDate()).isSame(time.startDay, 'day')
        );
      });
    } else if (name !== 'timeSelect') {
      temp = progressions.filter(log => {
        let temp = log.thoiGianCap as any;
        let temp2 = timePicked as any;
        return (
          moment(temp.toDate()).isSame(moment(temp2), 'day') &&
          moment(temp.toDate()).isSame(moment(temp2), 'hour') &&
          moment(temp.toDate()).isSame(moment(temp2), 'minute')
        );
      });
    } else {
      temp = progressions.filter(log => {
        let temp = log.thoiGianCap as any;
        let temp2 = value as any;
        return (
          moment(temp.toDate()).isSame(moment(temp2), 'day') &&
          moment(temp.toDate()).isSame(moment(temp2), 'hour') &&
          moment(temp.toDate()).isSame(moment(temp2), 'minute')
        );
      });
    }
    switch (name) {
      case 'sttSelect':
        setFilterOptions({ ...filterOptions, sttSelect: value });
        let resultStt = temp.filter(
          item =>
            item.stt === value &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
        setTable({ ...table, data: resultStt as any });
        break;
      case 'timeSelect':
        setFilterOptions({ ...filterOptions, timeSelect: value });
        console.log(stt, nguonCap, tinhTrang);
        let resultTime = temp.filter(
          item =>
            item.stt.includes(stt) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
        setTable({ ...table, data: resultTime as any });
        break;
      case 'sourceSelect':
        setFilterOptions({ ...filterOptions, sourceSelect: value });
        let ex1 = value === 'all' ? '' : value;
        let resultSource = temp.filter(
          item =>
            item.stt.includes(stt) &&
            item.nguonCap.includes(ex1) &&
            item.trangThai.includes(tinhTrang),
        );
        setTable({ ...table, data: resultSource as any });
        break;
      case 'statusSelect':
        setFilterOptions({ ...filterOptions, statusSelect: value });
        let ex2 = value === 'all' ? '' : value;
        let resultStatus = temp.filter(
          item =>
            item.stt.includes(stt) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(ex2),
        );
        setTable({ ...table, data: resultStatus as any });
        break;
      default:
        break;
    }
  };
  const handleServicesChange = (e: any) => {
    let { checked, value } = e.target;
    console.log('services', checked, value);
    let index = filterOptions.serviceSelect.findIndex(
      (item: any) => item.key === value,
    );
    let temp: any = [...filterOptions.serviceSelect];
    if (index === -1) {
      temp.push({
        key: value,
      });
    } else {
      temp.splice(index, 1);
    }
    setFilterOptions({ ...filterOptions, serviceSelect: temp });

    let nguonCap =
      filterOptions.sourceSelect === 'all' ? '' : filterOptions.sourceSelect;
    let tinhTrang =
      filterOptions.statusSelect === 'all' ? '' : filterOptions.statusSelect;
    let stt = filterOptions.sttSelect === 'all' ? '' : filterOptions.sttSelect;
    let timePicked =
      filterOptions.timeSelect === 'all' ? '' : filterOptions.timeSelect;
    let dichVu = [...temp];

    if (timePicked === '') {
      let temp = progressions
        .filter(log => {
          let temp = log.thoiGianCap as any;
          return (
            (moment(temp.toDate()) >= time.startDay &&
              moment(temp.toDate()) <= time.endDay) ||
            moment(temp.toDate()).isSame(time.endDay, 'day') ||
            moment(temp.toDate()).isSame(time.startDay, 'day')
          );
        })
        .filter(
          item =>
            item.stt.includes(stt) &&
            dichVu.some(dv => dv.key === item.dichVu) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
      setTable({ ...table, data: temp as any });
    } else {
      let temp = progressions
        .filter(log => {
          let temp = log.thoiGianCap as any;
          let temp2 = timePicked as any;
          return moment(temp.toDate()) === moment(temp2.toDate());
        })
        .filter(
          item =>
            item.stt.includes(stt) &&
            dichVu.some(dv => dv.key === item.dichVu) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
      setTable({ ...table, data: temp as any });
    }
  };
  const handleDateChange = (start: any, end: any) => {
    let nguonCap =
      filterOptions.sourceSelect === 'all' ? '' : filterOptions.sourceSelect;
    let tinhTrang =
      filterOptions.statusSelect === 'all' ? '' : filterOptions.statusSelect;
    let stt = filterOptions.sttSelect === 'all' ? '' : filterOptions.sttSelect;
    let dichVu =
      filterOptions.serviceSelect.length === 0
        ? [...dropdownDataDV]
        : filterOptions.serviceSelect;
    let timePicked =
      filterOptions.timeSelect === 'all' ? '' : filterOptions.timeSelect;

    if (timePicked === '') {
      let temp = progressions
        .filter(log => {
          let temp = log.thoiGianCap as any;
          return (
            (moment(temp.toDate()) >= start && moment(temp.toDate()) <= end) ||
            moment(temp.toDate()).isSame(end, 'day') ||
            moment(temp.toDate()).isSame(start, 'day')
          );
        })
        .filter(
          item =>
            item.stt.includes(stt) &&
            dichVu.some(dv => dv.key === item.dichVu) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
      setTable({ ...table, data: temp as any });
    } else {
      let temp = progressions
        .filter(log => {
          let temp = log.thoiGianCap as any;
          let temp2 = timePicked as any;
          return moment(temp.toDate()) === moment(temp2.toDate());
        })
        .filter(
          item =>
            item.stt.includes(stt) &&
            dichVu.some(dv => dv.key === item.dichVu) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );
      setTable({ ...table, data: temp as any });
    }
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
  // Handle changes dropdowns
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
                onChange={handleStartDateChange}
                className='rounded-lg w-[150px] h-11 px-4 py-2'
                format={'DD/MM/YYYY'}
                value={time.startDay}
              />
              <CaretRightOutlined className='mx-2' />
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-[150px] h-11 px-4 py-2'
                format={'DD/MM/YYYY'}
                value={time.endDay}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='relative md:flex-col'>
        {dropdownDataDV &&
          dropdownDataSources &&
          dropdownDataStatus &&
          dropdownDataStt &&
          dropdownDataTime && (
            <Table
              className='mt-4'
              columns={renderCollumns(
                dropdownDataStt,
                dropdownDataDV,
                dropdownDataTime,
                dropdownDataStatus,
              )}
              dataSource={table.data}
              pagination={{
                ...table.pagination,
                onChange: handlePanigationChange,
              }}
              loading={table.loading}
            />
          )}
        {/* Add button */}
        <div className='md:relative md:right-auto md:top-auto md:w-full absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'>
          <CSVLink
            data={csvData}
            headers={headers}
            filename={`Report ${moment().format('DDMMYYYYHHmmss')}`}
            className='flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
          >
            <div className='w-5 h-5'>
              <img src='/images/svgs/icon-download.svg' alt='' />
            </div>
            <span className='text-sm'>Tải về</span>
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default ReportManager;
