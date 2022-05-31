import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import './style.scss';
import RoleServices from '../../../../db/services/role.services';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
type Props = {};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};
const AddOle = (props: Props) => {
  const [role, setRole] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    RoleServices.getRole().then((res: any) => {
      setRole(res);
    });
  }, []);
  const handelAddData = (value: any) => {
    const index = role.findIndex(
      (item: any) => item.tenVaiTro === value.tenVaiTro,
    );
    if (index === -1) {
      let { tenVaiTro, moTa } = value;
      // console.log(tenVaiTro, moTa);
      RoleServices.addRole(tenVaiTro, moTa);
    }
    Swal.fire({
      title: 'Successfull',
      text: 'Thêm thành công',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    navigate('/ole-management');
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:mt-3 relative ole-add'>
      <div className='path text-gray-600 font-bold text-lg mb-9'>
        Cài đặt hệ thống &gt; Quản lý vai trò &gt;{' '}
        <span className='text-primary font-bold'>Thêm vai trò</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-3'>
        Danh sách vai trò
      </h2>
      <div className='w-full h-full update-content'>
        <h3 className='text-primary text-lg font-bold mb-2'>
          Thông tin vai trò
        </h3>
        <Form
          name='nest-messages'
          validateMessages={validateMessages}
          onFinish={handelAddData}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} lg={12} className='flex flex-col'>
              <Form.Item
                name={'tenVaiTro'}
                label='Tên vai trò'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên vai trò',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tên vai trò'
                />
              </Form.Item>
              <Form.Item name={'moTa'} label='Mô tả:' className='textarea'>
                <Input.TextArea rows={8} placeholder='Nhập thông tin mô tả' />
              </Form.Item>
              <span>
                <span className='text-primary'>*</span>Là trường thông tin bắt
                buộc
              </span>
            </Col>
            <Col
              span={12}
              xs={24}
              lg={12}
              className='bg-primary-organe-50 rounded-lg overflow-y-scroll max-h-[300px]'
            >
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng A
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng B
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng B
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className='flex justify-center items-center mt-3 gap-x-8'>
              <Button className='w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white '>
                Hủy bỏ
              </Button>
              <Button
                htmlType='submit'
                className='w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
              >
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddOle;
