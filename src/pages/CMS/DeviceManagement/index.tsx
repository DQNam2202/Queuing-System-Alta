import React, { useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import DeviceServices from '../../../db/services/device.services';
import ServiceServices from '../../../db/services/service.services';
import IDevice from '../../../db/types/device.type';
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
    dataIndex: 'trangThaiHoatDong',
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
    dataIndex: 'trangThaiKetNoi',
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
        to={`/devices-management/detail/${record.id}`}
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
        to={`/devices-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const DeviceManager = (props: Props) => {
  const [device, setDevice] = useState<IDevice[]>([]);
  const [key, setKey] = useState('');
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // state selected
  const [activity, setActivity] = useState('all');
  const [connect, setConnect] = useState('all');
  const { Option } = Select;

  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 9,
    },
    loading: false,
  });

  useEffect(() => {
    (async () => {
      let data = await DeviceServices.getDevice();
      let services = await ServiceServices.getService();

      data = data.map((item: any) => {
        let serviceList = item.dichVuSuDung.map((temp: any) => {
          let service = services.find(ser => ser.maDichVu === temp);
          return service?.tenDichVu;
        });
        return {
          ...item,
          key: item.id,
          dichVuSuDung: serviceList as any,
        };
      });
      setDevice(data);
      setTable({ ...table, data: data as any });
    })();
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  // Format VietNameses
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
  // Debounce search
  const handleInputSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setKey(value);
    if (searchRef.current) {
      clearTimeout(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = device.filter(
        (item: any) =>
          removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
            removeAccents(value.toLocaleLowerCase()),
          ) ||
          removeAccents(item.ip.toLocaleLowerCase()).includes(
            removeAccents(value.toLocaleLowerCase()),
          ) ||
          removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
            removeAccents(value.toLocaleLowerCase()),
          ),
      );

      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };
  // Change selected input trangThaiHoatDong. trangThaiKetNoi
  const handleActivityChange = (value: any) => {
    let statusConnect =
      connect === 'all' ? '' : connect === 'online' ? true : false;
    // Trạng thái hoạt động khi click vào ô trạng thái hoạt động
    let active = value === 'online' ? true : false;
    setActivity(value);
    // khi cả hai status và activity đều all
    if (statusConnect === '') {
      if (value === 'all') {
        let temp = device.filter(
          (item: any) =>
            removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.ip.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ),
        );
        setTable({ ...table, data: temp as any });
      } else {
        let temp = device.filter(
          (item: any) =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiHoatDong === active,
        );
        setTable({ ...table, data: temp as any });
      }
      return;
    } else {
      if (value === 'all') {
        let temp = device.filter(
          (item: any) =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiKetNoi === statusConnect,
        );
        setTable({ ...table, data: temp as any });
      } else {
        let temp = device.filter(
          (item: any) =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiKetNoi === statusConnect &&
            item.trangThaiHoatDong === active,
        );
        setTable({ ...table, data: temp as any });
      }
    }
  };
  const handleConnectChange = (value: any) => {
    let statusActivity =
      activity === 'all' ? '' : activity === 'online' ? true : false;
    let active = value === 'online' ? true : false;

    setConnect(value);
    if (statusActivity === '') {
      if (value === 'all') {
        let temp = device.filter(
          (item: any) =>
            removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
            removeAccents(item.ip.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ),
        );
        setTable({ ...table, data: temp as any });
      } else {
        let temp = device.filter(
          item =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiKetNoi === active,
        );
        setTable({ ...table, data: temp as any });
      }
      return;
    } else {
      if (value === 'all') {
        let temp = device.filter(
          item =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiHoatDong === statusActivity,
        );
        setTable({ ...table, data: temp as any });
      } else {
        let temp = device.filter(
          item =>
            (removeAccents(item.maThietBi.toLocaleLowerCase()).includes(
              removeAccents(key.toLocaleLowerCase()),
            ) ||
              removeAccents(item.tenThietBi.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              ) ||
              removeAccents(item.ip.toLocaleLowerCase()).includes(
                removeAccents(key.toLocaleLowerCase()),
              )) &&
            item.trangThaiHoatDong === statusActivity &&
            item.trangThaiKetNoi === active,
        );
        setTable({ ...table, data: temp as any });
      }
    }
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
              onChange={handleActivityChange}
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
              onChange={handleConnectChange}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Kết nối</Option>
              <Option value='offline'>Mất kết nối</Option>
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            // onSearch={value => console.log(value)}
            onChange={handleInputSearch}
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
