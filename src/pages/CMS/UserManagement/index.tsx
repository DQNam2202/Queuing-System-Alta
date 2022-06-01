import React, { useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserServices from '../../../db/services/user.services';
import RoleServices from '../../../db/services/role.services';
import Role from '../../../db/types/role.type';

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
    width: '18%',
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
        to={`/user-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const UserManager = (props: Props) => {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState<Role[]>([]);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { Option } = Select;

  // Pagination table
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });

  function handelChangeSelect(value: any) {
    if (value === 'all') {
      setTable({
        ...table,
        data: user as any,
      });
      return;
    }
    const roleItem =
      role[role.findIndex((role: any) => role.id === value)].tenVaiTro;
    const data = user.filter((item: any) => item.vaiTro === roleItem);
    setTable({
      ...table,
      data: data as any,
    });
  }

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

  useEffect(() => {
    RoleServices.getRole().then((roles: any) => {
      setRole(roles);
      UserServices.getUser().then((res: any) => {
        res = res.map((item: any) => ({
          ...item,
          key: item.id,
          vaiTro:
            roles[roles.findIndex((role: any) => role.id === item.vaiTro)]
              .tenVaiTro,
        }));
        setUser(res);
        setTable({
          ...table,
          data: res,
        });
      });
    });
  }, []);

  // Find user by name, tenDangNhap
  const handelSearch = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = user.filter(
        (item: any) =>
          removeAccents(item.hoTen.toLocaleLowerCase()).includes(
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
              onChange={handelChangeSelect}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all' key='all'>
                Tất cả
              </Option>
              {role && role.length > 0
                ? role.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.tenVaiTro}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base md:items-center mt-2'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            // onSearch={value => console.log(value)}
            onChange={handelSearch}
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
