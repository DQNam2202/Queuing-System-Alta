import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceServices from '../../../../db/services/service.services';
import IService from '../../../../db/types/service.type';
import ProgressionServices from '../../../../db/services/progression.services';
import IProgression from '../../../../db/types/progression.type';
import moment from 'moment-timezone';
type Props = {};

const columns = [
  {
    title: 'Số thứ tự',
    dataIndex: 'stt',
    width: '50%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    render: (trangThai: any) =>
      trangThai === 'used' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full'></span>{' '}
          Đã hoàn thành
        </span>
      ) : trangThai === 'removed' ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-gray-400 rounded-full'></span>
          Vắng
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-blue rounded-full'></span>
          Đang thực hiện
        </span>
      ),
  },
];

const ServiceManager = (props: Props) => {
  const { id } = useParams();
  const [serviceDetail, setServiceDetail] = useState<IService>();
  const [progressions, setProgressions] = useState<IProgression[]>([]);
  const [key, setKey] = useState('');
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
  const [statusSelect, setStatusSelect] = useState('all');
  const history = useNavigate();
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
      let progs = await ProgressionServices.getProgression();

      let index = data.findIndex(item => item.id === id);
      if (index === -1) {
        history('/services-management');
      } else {
        progs = progs
          .filter(item => item.dichVu === data[index].id)
          .map(item => {
            return {
              ...item,
              key: item.stt,
            };
          });
        setServiceDetail(data[index]);
        setProgressions(progs);
        setTable({ ...table, data: progs as any });
      }
    })();
  }, []);
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

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
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;
    setKey(value);
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
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
            (xoa_dau(item.email.toLocaleLowerCase()).includes(
              xoa_dau(value.toLocaleLowerCase()),
            ) ||
              xoa_dau(item.hoTen.toLocaleLowerCase()).includes(
                xoa_dau(value.toLocaleLowerCase()),
              ) ||
              xoa_dau(item.stt.toLocaleLowerCase()).includes(
                xoa_dau(value.toLocaleLowerCase()),
              )) &&
            item.trangThai.includes(tinhTrang),
        );

      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };
  const handleDateChange = (start: any, end: any) => {
    let tinhTrang = statusSelect === 'all' ? '' : statusSelect;

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
          (xoa_dau(item.email.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
            xoa_dau(item.hoTen.toLocaleLowerCase()).includes(
              xoa_dau(key.toLocaleLowerCase()),
            ) ||
            xoa_dau(item.stt.toLocaleLowerCase()).includes(
              xoa_dau(key.toLocaleLowerCase()),
            )) &&
          item.trangThai.includes(tinhTrang),
      );

    setTable({ ...table, data: temp as any });
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
  const handleStatusChange = (value: any) => {
    setStatusSelect(value);
    if (value !== 'all') {
      console.log(progressions);
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
            (xoa_dau(item.email.toLocaleLowerCase()).includes(
              xoa_dau(key.toLocaleLowerCase()),
            ) ||
              xoa_dau(item.hoTen.toLocaleLowerCase()).includes(
                xoa_dau(key.toLocaleLowerCase()),
              ) ||
              xoa_dau(item.stt.toLocaleLowerCase()).includes(
                xoa_dau(key.toLocaleLowerCase()),
              )) &&
            item.trangThai === value,
        );

      setTable({ ...table, data: temp as any });
      return;
    }
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
          xoa_dau(item.email.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.hoTen.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ) ||
          xoa_dau(item.stt.toLocaleLowerCase()).includes(
            xoa_dau(key.toLocaleLowerCase()),
          ),
      );

    setTable({ ...table, data: temp as any });
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 relative'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Dịch vụ &gt; Danh sách dịch vụ &gt;
        <span className='text-primary font-bold'>Chi tiết</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý dịch vụ</h2>
      <div className='flex gap-x-5 relative lg:flex-col lg:overflow-y-scroll lg:max-h-[80vh]'>
        <div className='w-2/6 info-content lg:w-full'>
          <h3 className='text-primary mb-3 font-bold text-xl'>
            Thông tin dịch vụ
          </h3>
          <table className='mb-3'>
            <tbody className='text-left text-base'>
              <tr>
                <th className='pr-1' scope='row'>
                  Mã dịch vụ:
                </th>
                <td className='w-2/3'>{serviceDetail?.maDichVu}</td>
              </tr>
              <tr>
                <th className='pr-1' scope='row'>
                  Tên dịch vụ:
                </th>
                <td className='w-2/3'>{serviceDetail?.tenDichVu}</td>
              </tr>
              <tr>
                <th className='pr-1' scope='row'>
                  Mô tả:
                </th>
                <td className='w-2/3'>{serviceDetail?.moTa}</td>
              </tr>
            </tbody>
          </table>
          <h3 className='text-primary mb-3 font-bold text-xl'>
            Quy tắc cấp số
          </h3>
          <table className='mb-3 capSo'>
            <tbody className='text-left text-base'>
              {serviceDetail?.autoIncrease[0] ? (
                <tr>
                  <th className='pr-5 text-base' scope='row'>
                    Tăng tự động:
                  </th>
                  <td>
                    <input
                      className='inline-block w-16'
                      type='text'
                      value={serviceDetail?.autoIncrease[0]}
                      readOnly
                    />{' '}
                    đến{' '}
                    <input
                      className='inline-block w-16 '
                      type='text'
                      value={serviceDetail?.autoIncrease[1]}
                      readOnly
                    />
                  </td>
                </tr>
              ) : (
                ''
              )}
              {serviceDetail?.prefix ? (
                <tr>
                  <th className='pr-5 text-base' scope='row'>
                    Prefix:
                  </th>
                  <td>
                    <input
                      className='inline-block w-16'
                      type='text'
                      value={serviceDetail?.prefix}
                      readOnly
                    />
                  </td>
                </tr>
              ) : (
                ''
              )}
              {serviceDetail?.surfix ? (
                <tr>
                  <th className='pr-5 text-base' scope='row'>
                    Surfix:
                  </th>
                  <td>
                    <input
                      className='inline-block w-16'
                      type='text'
                      value={serviceDetail?.surfix}
                      readOnly
                    />
                  </td>
                </tr>
              ) : (
                ''
              )}
              {serviceDetail?.resetEveryDay ? (
                <tr>
                  <th className='pr-5 text-base' scope='row'>
                    Reset mỗi ngày
                  </th>
                </tr>
              ) : (
                ''
              )}
            </tbody>
          </table>
          <p>Ví dụ: {serviceDetail?.maDichVu}0001</p>
        </div>
        <div className='w-4/6 list-content lg:w-full lg:mt-4'>
          <div className='controls flex justify-between xl:flex-col'>
            <div className='flex gap-x-1 mr-1'>
              <div className='item flex flex-col text-sm'>
                <span className='font-semibold'>Trạng thái</span>
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  onChange={handleStatusChange}
                  defaultValue={'all'}
                  className='w-[120px]'
                >
                  <Option value='all'>Tất cả</Option>
                  <Option value='used'>Đã hoàn thành</Option>
                  <Option value='pending'>Đang thực hiện</Option>
                  <Option value='removed'>Vắng</Option>
                </Select>
              </div>
              <div className='item flex flex-col text-sm'>
                <span className='font-semibold'>Chọn thời gian</span>
                <div className='date-controls flex items-center'>
                  <DatePicker
                    onChange={handleStartDateChange}
                    className='rounded-lg w-[120px] h-11'
                    format={'DD/MM/YYYY'}
                    value={time.startDay}
                  />
                  <CaretRightOutlined className='mx-1' />
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={handleEndDateChange}
                    className='rounded-lg w-[120px] h-11'
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
                className='w-[170px] h-11'
              />
            </div>
          </div>
          <div className='relative'>
            <Table
              className='mt-4'
              columns={columns}
              dataSource={table.data}
              pagination={{
                ...table.pagination,
                onChange: handlePanigationChange,
              }}
              loading={table.loading}
            />
          </div>
        </div>
        {/* Add button */}
        <div className='lg:flex-row lg:gap-x-2 lg:mt-3 lg:relative lg:top-auto lg:right-auto lg:w-full absolute -right-28 top-0 flex flex-col gap-y-3'>
          <Link
            to={`/services-management/update/${id}`}
            className='lg:w-full flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
          >
            <div className='w-5 h-5'>
              <img src='/images/svgs/edit-square.svg' alt='' />
            </div>
            <span className='text-sm'>Cập nhật danh sách</span>
          </Link>
          <Link
            to='/services-management/'
            className='lg:w-full  flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
          >
            <div className='w-5 h-5'>
              <img src='/images/svgs/back-square.svg' alt='' />
            </div>
            <span className='text-sm'>Quay lại</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceManager;
