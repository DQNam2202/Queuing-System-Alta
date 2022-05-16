import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import './style.scss';
const FillImformation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e: any) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setIsModalVisible(false);
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className=''>
        <Button type='primary' onClick={showModal}>
          Click me
        </Button>
        <Modal
          title='Điền thông tin của bạn'
          closable={false}
          visible={isModalVisible}
          footer={null}
        >
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center w-[499px]'>
              <div className='w-full'>
                <form className='w-full'>
                  <div className=''>
                    <label className='text-base font-normal text-primary-gray-500'>
                      Họ và tên <span className='text-[#FF4747]'>*</span>
                    </label>
                    <Input
                      className='w-full h-11 '
                      placeholder='Nhập họ và tên của bạn'
                    />
                  </div>
                  <div className='mt-4'>
                    <label className='text-base font-normal text-primary-gray-500'>
                      Số điện thoại <span className='text-[#FF4747]'> *</span>
                    </label>
                    <Input
                      className='w-full h-11'
                      placeholder='Nhập số điện thoại của bạn'
                    />
                  </div>
                  <div className='mt-4 mb-[10px]'>
                    <label className='text-base font-normal text-primary-gray-500'>
                      Email <span className='text-[#FF4747]'> *</span>
                    </label>
                    <Input
                      className='w-full h-11 '
                      placeholder='Nhập email của bạn'
                    />
                  </div>
                  <span className='text-sm font-normal leading-5'>
                    <strong className='text-[#FF4747]'>* </strong>
                    Là trường thông tin bắt buộc
                  </span>
                  <div className='flex justify-center items-center mt-[49px] gap-x-[33px]'>
                    <button
                      type='submit'
                      className='btn-primary btn-outline'
                      onClick={handleCancel}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type='submit'
                      className='btn-primary'
                      onClick={handleOk}
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FillImformation;
