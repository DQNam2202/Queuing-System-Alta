import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupImformation from '../../../Interaction/PopupImformation';
import ServiceServices from '../../../../db/services/service.services';
import IService from '../../../../db/types/service.type';
import Swal from 'sweetalert2';
import './style.scss';
type Props = {};

const { Option } = Select;

const AddProgression = (props: Props) => {
  const history = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState<IService[]>([]);
  const [serviceSelect, setServiceSelect] = useState<IService>();

  useEffect(() => {
    (async () => {
      let data = await ServiceServices.getService();
      setServices(data);
    })();
  }, []);
  const showModal = () => {
    if (!serviceSelect) {
      Swal.fire({
        title: 'Error!',
        text: 'Vui lòng chọn dịch vụ',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
      });
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function handleChange(value: any) {
    let index = services.findIndex(item => item.maDichVu === value);
    if (index !== -1) {
      setServiceSelect(services[index]);
    }
  }
  const handelBackProgression = () => {
    history('/progression-management');
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[50px] md:mt-3 lg:pr-2 relative progression-add'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Cấp số &gt; Danh sách cấp số &gt;{' '}
        <span className='text-primary font-bold'>Cấp số mới</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý cấp số</h2>
      <div className='flex flex-col justify-center items-center shadow-dashboard-content py-5 h-[70vh]'>
        <h2 className='text-3xl font-bold leading-9 text-primary mb-10'>
          CẤP SỐ MỚI
        </h2>
        <span className='text-xl font-bold text-primary-gray-400 mb-3 '>
          Dịch vụ khách hàng lựa chọn
        </span>
        <Select
          suffixIcon={<CaretDownOutlined />}
          size={'large'}
          placeholder='Chọn dịch vụ'
          onChange={handleChange}
          className='w-[400px] mb-20'
        >
          {services.map(item => {
            return <Option key={item.maDichVu}>{item.tenDichVu}</Option>;
          })}
        </Select>
        <Space align='center' className=' flex justify-center w-full'>
          <Button
            className='w-[115px] bg-primary-50 rounded-lg border-primary-400  text-primary border-2  text-center px-[20px] py-[7px] font-bold hover:text-primary hover:border-primary btn-cancel mr-6'
            onClick={handelBackProgression}
          >
            Hủy bỏ
          </Button>
          <Button
            className='w-[115px] bg-primary-400 rounded-lg border-primary-400  text-white  text-center px-[20px] py-[7px] font-bold hover:border-primary hover:bg-primary hover:text-white'
            htmlType='submit'
            onClick={showModal}
          >
            In số
          </Button>
        </Space>
      </div>
      {serviceSelect && (
        <PopupImformation
          service={serviceSelect}
          handleCancel={handleCancel}
          handleOk={handleOk}
          isModalVisible={isModalVisible}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default AddProgression;
