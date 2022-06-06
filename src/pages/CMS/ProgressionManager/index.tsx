import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import ServiceServices from '../../../db/services/service.services';
import IService from '../../../db/types/service.type';
import ProgressionServices from '../../../db/services/progression.services';
import IProgression from '../../../db/types/progression.type';
import moment from 'moment-timezone';

type Props = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '8%',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'hoTen',
    width: '15%',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDichVu',
    width: '15%',
  },
  {
    title: 'Thời gian cấp',
    dataIndex: 'thoiGianCap',
    width: '18%',
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
    title: 'Hạn sử dụng',
    dataIndex: 'hanSuDung',
    width: '18%',
    render: (hanSuDung: any) => {
      return (
        <span>
          {moment(hanSuDung.toDate())
            .tz('Asia/Ho_Chi_Minh')
            .format('HH:mm - DD/MM/YYYY')}
        </span>
      );
    },
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
        to={`/progression-management/detail/${record.id}`}
      >
        Chi tiết
      </Link>
    ),
  },
];

const ProgressManager = (props: Props) => {
  const [services, setServices] = useState<IService[]>([]);
  const [key, setKey] = useState('');
  const [progression, setProgression] = useState<IProgression[]>([]);

  // search
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // datetime input
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
  // service, status, source selected
  const [serviceSelect, setServiceSelect] = useState('all');
  const [statusSelect, setStatusSelect] = useState('all');
  const [sourceSelect, setSourceSelect] = useState('all');

  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  const { Option } = Select;

  useEffect(() => {
    (async () => {
      let data = await ServiceServices.getService();
      let progressions = await ProgressionServices.getProgression();
      progressions = progressions.map(item => {
        let temp = data.find(ser => ser.id === item.dichVu);
        return {
          ...item,
          key: item.id,
          tenDichVu: temp?.tenDichVu,
        };
      });
      setProgression(progressions);
      data.unshift({
        autoIncrease: ['123', '123'],
        maDichVu: 'all',
        moTa: '',
        prefix: '0001',
        resetEveryDay: true,
        surfix: '0001',
        tenDichVu: 'Tất cả',
        trangThai: false,
        id: 'all',
      });
      setServices(data);
      setTable({ ...table, data: progressions as any });
    })();
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  const renderDropdownOption = (list: any) => {
    return list.map((item: any, index: number) => {
      return <Option key={item.id}>{item.tenDichVu}</Option>;
    });
  };
  const removeAccents = (str: string) => {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };

  const handleKeyWordChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    let nguonCap = sourceSelect === 'all' ? '' : sourceSelect;
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;
    let dichVu = serviceSelect === 'all' ? '' : serviceSelect;
    setKey(value);
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = progression
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
            (removeAccents(item.email.toLocaleLowerCase()).includes(
              removeAccents(value.toLocaleLowerCase()),
            ) ||
              removeAccents(item.hoTen.toLocaleLowerCase()).includes(
                removeAccents(value.toLocaleLowerCase()),
              ) ||
              removeAccents(item.stt.toLocaleLowerCase()).includes(
                removeAccents(value.toLocaleLowerCase()),
              )) &&
            item.dichVu.includes(dichVu) &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );

      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };
  const handleDateChange = (start: any, end: any) => {
    let nguonCap = sourceSelect === 'all' ? '' : sourceSelect;
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;
    let dichVu = serviceSelect === 'all' ? '' : serviceSelect;

    let temp = progression
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
          (removeAccents(item.email.toLocaleLowerCase()).includes(
            removeAccents(key.toLocaleLowerCase()),
          ) ||
            removeAccents(item.hoTen.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.stt.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            )) &&
          item.dichVu.includes(dichVu) &&
          item.nguonCap.includes(nguonCap) &&
          item.trangThai.includes(tinhTrang),
      );

    setTable({ ...table, data: temp as any });
  };

  // handel start day
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
  // handle end day
  const handleEndDateChange = (date: any, dateString: String) => {
    setTime({ ...time, endDay: date });
    handleDateChange(time.startDay, date);
  };
  function disabledDate(current: any) {
    return current < time.startDay;
  }
  const handleServiceChange = (value: any) => {
    setServiceSelect(value);
    let nguonCap = sourceSelect === 'all' ? '' : sourceSelect;
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;
    if (value !== 'all') {
      let temp = progression
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
            (removeAccents(item.email.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.hoTen.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.stt.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.dichVu === value &&
            item.nguonCap.includes(nguonCap) &&
            item.trangThai.includes(tinhTrang),
        );

      setTable({ ...table, data: temp as any });
      return;
    }
    let temp = progression
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
          (removeAccents(item.email.toLocaleLowerCase()).includes(
            removeAccents(key.toLocaleLowerCase()),
          ) ||
            removeAccents(item.hoTen.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.stt.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            )) &&
          item.nguonCap.includes(nguonCap) &&
          item.trangThai.includes(tinhTrang),
      );

    setTable({ ...table, data: temp as any });
  };
  const handleStatusChange = (value: any) => {
    setStatusSelect(value);
    let nguonCap = sourceSelect === 'all' ? '' : sourceSelect;
    let dichVu = serviceSelect === 'all' ? '' : serviceSelect;
    if (value !== 'all') {
      let temp = progression
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
            (removeAccents(item.email.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.hoTen.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.stt.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.nguonCap.includes(nguonCap) &&
            item.dichVu.includes(dichVu) &&
            item.trangThai === value,
        );

      setTable({ ...table, data: temp as any });
      return;
    }
    let temp = progression
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
          (removeAccents(item.email.toLocaleLowerCase()).includes(
            removeAccents(key.toLocaleLowerCase()),
          ) ||
            removeAccents(item.hoTen.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.stt.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            )) &&
          item.nguonCap.includes(nguonCap) &&
          item.dichVu.includes(dichVu),
      );

    setTable({ ...table, data: temp as any });
  };
  const handleSourceChange = (value: any) => {
    setSourceSelect(value);
    let dichVu = serviceSelect === 'all' ? '' : serviceSelect;
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;
    if (value !== 'all') {
      let temp = progression
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
            (removeAccents(item.email.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.hoTen.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.stt.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThai.includes(tinhTrang) &&
            item.dichVu.includes(dichVu) &&
            item.nguonCap === value,
        );

      setTable({ ...table, data: temp as any });
      return;
    }
    let temp = progression
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
          (removeAccents(item.email.toLocaleLowerCase()).includes(
            removeAccents(key.toLocaleLowerCase()),
          ) ||
            removeAccents(item.hoTen.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.stt.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            )) &&
          item.trangThai.includes(tinhTrang) &&
          item.dichVu.includes(dichVu),
      );

    setTable({ ...table, data: temp as any });
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
              onChange={handleServiceChange}
              defaultValue={'all'}
              className='w-[150px] md:w-full'
            >
              {services && renderDropdownOption(services)}
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Tình trạng</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleStatusChange}
              defaultValue={'Tất cả'}
              className='w-[150px] md:w-full'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='pending'>Đang chờ</Option>
              <Option value='used'>Đã sử dụng</Option>
              <Option value='remove'>Bỏ qua</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Nguồn cấp</span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleSourceChange}
              defaultValue={'Tất cả'}
              className='w-[150px] md:w-full'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='Kiosk'>Kiosk</Option>
              <Option value='Hệ thống'>Hệ thống</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-sm w-full'>
            <span className='font-semibold'>Chọn thời gian</span>
            <div className='date-controls flex items-center'>
              <DatePicker
                onChange={handleStartDateChange}
                className='rounded-lg w-32 h-11 md:w-full'
                format={'DD/MM/YYYY'}
                value={time.startDay}
              />
              <CaretRightOutlined className='mx-1' />
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-32 h-11 md:w-full'
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
            // onSearch={value => console.log(value)}
            onChange={handleKeyWordChange}
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
