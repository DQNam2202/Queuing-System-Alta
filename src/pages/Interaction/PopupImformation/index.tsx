import React, { useState, MouseEventHandler } from 'react';
import { Modal, Button, Input } from 'antd';
import './style.scss';
import PopupNumberPrint from '../../Interaction/PopupNumberPrint';

type Props = {
  showModal: MouseEventHandler;
  handleOk: MouseEventHandler;
  handleCancel: MouseEventHandler;
  isModalVisible: boolean;
};
const FillImformation = (props: Props) => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk = (e: any) => {
    e.preventDefault();
  };

  const handleCancel1 = (e: any) => {
    e.preventDefault();
    setIsModalVisible1(false);
  };

  const { showModal, handleCancel, isModalVisible } = props;
  return (
    <div className='flex justify-center items-center min-h-screen '>
      <div className=''>
        <Modal
          className='modal-imformation'
          title='Điền thông tin của bạn'
          closable={false}
          onCancel={handleCancel}
          visible={isModalVisible}
          footer={null}
        >
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center w-[499px]'>
              <div className='w-full'>
                <form
                  className='w-full'
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
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
                      onClick={showModal1}
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
      <PopupNumberPrint
        handleCancel={handleCancel1}
        handleOk={handleOk}
        isModalVisible={isModalVisible1}
        showModal={showModal1}
      ></PopupNumberPrint>
      ;
    </div>
  );
};

export default FillImformation;