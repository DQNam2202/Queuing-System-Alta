import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Input } from 'antd';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import SystemLogServices from '../../../db/services/log_system.services';
import moment from 'moment-timezone';
import Log from '../../../db/types/log_system.type';
import './style.scss';
// import moment from 'moment';
type Props = {};

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDangNhap',
    width: '25%',
  },
  {
    title: 'Thời gian tác động',
    dataIndex: 'actionTime',
    render: (actionTime: any) => {
      return (
        <span>
          {moment(actionTime.toDate())
            .tz('Asia/Ho_Chi_Minh')
            .format('DD/MM/YYYY HH:mm:ss')}
        </span>
      );
    },
    width: '20%',
  },
  {
    title: 'IP thực hiện',
    dataIndex: 'ip',
    width: '20%',
  },
  {
    title: 'Thao tác thực hiện',
    dataIndex: 'action',
    width: '35%',
  },
];
const UserLog = (props: Props) => {
  const [log, setLog] = useState<Log[]>([]);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });

  // Get data from firebase
  useEffect(() => {
    SystemLogServices.getSystemLog().then((res: any) => {
      res = res.map((item: any, index: any) => ({
        ...item,
        key: index,
      }));
      setLog(res);
      setTable({
        ...table,
        data: res,
      });
    });
  }, []);

  // Remove vietnamese character
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

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  // Search input
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = log
        .filter(logItem => {
          let temp = logItem.actionTime as any;
          return (
            moment(temp.toDate()) >= time.startDay &&
            moment(temp.toDate()) <= time.endDay
          );
        })
        .filter(
          item =>
            removeAccents(item.tenDangNhap.toLocaleLowerCase()).includes(
              removeAccents(value.toLocaleLowerCase()),
            ) ||
            removeAccents(item.action.toLocaleLowerCase()).includes(
              removeAccents(value.toLocaleLowerCase()),
            ) ||
            removeAccents(item.ip.toLocaleLowerCase()).includes(
              removeAccents(value.toLocaleLowerCase()),
            ) ||
            removeAccents(item.tenDangNhap.toLocaleLowerCase()).includes(
              removeAccents(value.toLocaleLowerCase()),
            ),
        );

      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };

  const handleStartDateChange = (date: any, dateString: String) => {
    let temp = date.clone();
    if (date > time.endDay) {
      setTime({ startDay: temp, endDay: date.add(7, 'days') });
    } else {
      setTime({ ...time, startDay: temp });
    }
  };
  const handleEndDateChange = (date: any, dateString: String) => {
    setTime({ ...time, endDay: date });
  };
  function disabledDate(current: any) {
    return current < time.startDay;
  }
  useEffect(() => {
    let data = log.filter(item => {
      let temp = item.actionTime as any;
      return (
        moment(temp.toDate()) >= time.startDay &&
        moment(temp.toDate()) <= time.endDay
      );
    });
    setTable({ ...table, data: data as any });
  }, [time]);
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
                onChange={handleStartDateChange}
                className='rounded-lg w-[150px] h-11'
                format={'DD/MM/YYYY'}
                name='startDay'
                value={time.startDay}
              />
              <CaretRightOutlined className='mx-2' />
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                name='endDay'
                value={time.endDay}
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
            onChange={handleSearch}
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
