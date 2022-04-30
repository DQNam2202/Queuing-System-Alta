import React from 'react';
import { Button, Layout, Menu, Select } from 'antd';
import { DropboxOutlined, CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
const { Content, Sider } = Layout;
const DrawNumbers = () => {
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const departmentList = [
    'Khám tim mach',
    'Khám phụ khoa',
    'Khám răng',
    'Khám mắt',
    'Khám tai mũi họng',
    'Khám da liễu',
    'Khám tiết niệu',
    'Khám thần kinh',
  ];
  const children = [];
  for (let i = 0; i < departmentList.length; i++) {
    children.push(<Option key={i}>{departmentList[i]}</Option>);
  }
  return (
    <React.Fragment>
      <Layout>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className='w-[80px] h-[64px] mr-auto ml-auto mt-8 mb-14'>
            <img
              src='./images/Logo_alta.png'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            items={[DropboxOutlined].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `Cấp số`,
            }))}
          />
        </Sider>
        <Layout>
          <Content className='mt-[60px] ml-6'>
            <div className='site-layout-background p-6 font-bold text-xl leading-9 text-primary'>
              Quản lý cấp số
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-2xl font-bold leading-9 text-primary-gray-800 mt-[74px] mb-10'>
                CẤP SỐ MỚI
              </h2>
              <span className='text-xl font-bold text-primary-gray-400 mb-3'>
                Dịch vụ khách hàng lựa chọn
              </span>
              <Select
                suffixIcon={<CaretDownOutlined />}
                size={'large'}
                placeholder='Chọn dịch vụ'
                onChange={handleChange}
                className='w-[400px] mb-20'
              >
                {children}
              </Select>
              <Button type='primary' size={'large'}>
                Xác nhận
              </Button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default DrawNumbers;
