import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Button } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import './style.scss';
type LayoutType = Parameters<typeof Form>[0]['layout'];

const Profile = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  useEffect(() => {
    form.setFieldsValue({
      username: 'Dương Quốc Nam',
      phoneNumber: '0779382202',
      email: 'duongquocnam224400@gmail.com',
      loginName: 'DQNam2202',
      password: '312220200',
      role: 'Dev',
    });
  }, []);
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative profile'>
      <div className='path text-primary-400 font-bold text-lg mb-20'>
        Thông tin cá nhân
      </div>
      <div className='py-10 px-4 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)] bg-white lg:overflow-y-scroll lg:h-[85vh]'>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ sm: 16, md: 24, lg: 32 }}>
            <Col className='gutter-row' lg={8} md={24}>
              <div className='relative flex flex-col justify-center items-center'>
                <div className='lg:w-40 lg:h-40 w-[248px] h-[248px] text-center relative'>
                  <img
                    className='w-full h-full object-cover rounded-[318px]'
                    src='https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg'
                    alt='avatar'
                  />
                  <div className='absolute w-11 h-11 -bottom-2 left-3/4 -translate-x-3/4 bg-primary border-2 border-solid border-white flex justify-center items-center rounded-full cursor-pointer'>
                  <Form.Item
                    name='upload'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                  >
                    <Upload name='logo' action='/upload.do' listType='picture'>
                      <Button icon={<CameraOutlined />}></Button>
                    </Upload>
                  </Form.Item>
                </div>
                </div>
                <h2 className='mt-5 text-center text-2xl font-bold leading-9 text-primary-gray-500'>
                  Dương Quốc Nam
                </h2>
              </div>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item
                label='Tên người dùng'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='username'
              >
                <Input placeholder='username' />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='phoneNumber'
              >
                <Input placeholder='0779382202' />
              </Form.Item>
              <Form.Item
                label='Email'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='email'
              >
                <Input placeholder='example@gmail.com' />
              </Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item
                label='Tên đăng nhập'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='loginName'
              >
                <Input placeholder='duongnam2202' />
              </Form.Item>
              <Form.Item
                label='Mật khẩu'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='password'
              >
                <Input placeholder='32127189' className='' />
              </Form.Item>
              <Form.Item
                label='Vai trò'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='role'
              >
                <Input placeholder='Tester' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
