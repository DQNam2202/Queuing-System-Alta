import React, { MouseEventHandler, useState } from 'react';
import { Modal, Button } from 'antd';
import './style.scss';
import moment from 'moment-timezone';
type Props = {
  handleOk: MouseEventHandler;
  handleCancel: MouseEventHandler;
  isModalVisible: boolean;
  result: any
};
const PopupNumberPrint = (props: Props) => {
  const { handleOk, handleCancel, isModalVisible,result } = props;
  return (
    <div className='flex justify-center items-center w-full min-h-screen '>
      <Modal
        title=''
        className='modal-number'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className='flex flex-col justify-center items-center mb-11'>
          <p className='mt-12 font-bold text-[32px] leading-[48px] text-primary-gray-400 mb-6'>
            Số thứ tự được cấp
          </p>
          <h2 className='text-[56px] font-extrabold leading-[60px] text-primary-500 mb-6'>
            {result.stt}
          </h2>
          <p className='text-lg font-normal leading-7 text-primary-gray-500'>
            DV: {result.tenDichVu}
            <strong className='text-lg font-bold leading-7 text-primary-gray-500'>
              (tại quầy số 1)
            </strong>
          </p>
        </div>
        <div className='absolute bottom-0 left-0 bg-primary-400 w-full h-28 flex flex-col justify-center items-center rounded-bl-3xl rounded-br-3xl'>
          <div className='flex items-center justify-center mt-4 mb-3 text-white text-[22px] leading-8 font-bold'>
            <span className='mr-2'>Thời gian cấp:</span>
            <span>{moment(result.thoiGianCap).tz("Asia/Ho_Chi_Minh").format('HH:mm - DD/MM/YYYY')}</span>
          </div>
          <div className='flex items-center justify-center text-white text-[22px] leading-8 font-bold mb-4'>
            <span className='mr-2'>Hạn sử dụng:</span>
            <span>{moment(result.hanSuDung).tz("Asia/Ho_Chi_Minh").format('HH:mm - DD/MM/YYYY')}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupNumberPrint;