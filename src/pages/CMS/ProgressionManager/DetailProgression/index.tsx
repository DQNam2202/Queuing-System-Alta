import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceServices from '../../../../db/services/service.services';
import ProgressionServices from '../../../../db/services/progression.services';
import moment from 'moment-timezone';

const DetailProgression = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [progression, setProgression] = useState<any>();

  useEffect(() => {
    (async () => {
      let data = await ServiceServices.getService();
      let progressions = await ProgressionServices.getProgression();

      let index = progressions.findIndex(item => item.id === id);
      if (index === -1) {
        history('/progression?-management');
      }
      let temp = data.find(ser => ser.id === progressions[index].dichVu);
      setProgression({
        ...progressions[index],
        tenDichVu: temp?.tenDichVu,
      });
    })();
  }, []);
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] md:mt-3 relative'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Thiết bị &gt; Danh sách cấp số &gt;{' '}
        <span className='text-primary font-bold'>Chi tiết</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý cấp số</h2>
      <div className=' h-[70vh] relative w-full py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)] bg-white'>
        <h3 className='text-primary text-lg font-bold mb-5'>
          Thông tin cấp số
        </h3>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Họ tên:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {progression?.hoTen}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Nguồn cấp:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {progression?.nguonCap}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Tên dịch vụ:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {progression?.tenDichVu}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Trạng thái:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 flex items-center'>
                {progression?.trangThai === 'used' ? (
                  <span className='flex items-center gap-x-2'>
                    <span className='block h-1 w-1 bg-primary-gray-300 rounded-full shrink-0'></span>
                    Đã sử dụng
                  </span>
                ) : progression?.trangThai === 'pending' ? (
                  <span className='flex items-center gap-x-2'>
                    <span className='block h-1 w-1 bg-primary-blue rounded-full shrink-0'></span>
                    Đang chờ
                  </span>
                ) : (
                  <span className='flex items-center gap-x-2'>
                    <span className='block h-1 w-1 bg-primary-red rounded-full shrink-0'></span>
                    Bỏ qua
                  </span>
                )}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Số thứ tự:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {progression?.stt}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Số điện thoại:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {progression?.soDienThoai}
              </p>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className='mb-4'>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Thời gian cấp:
              </span>
              <span className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
                {moment(progression?.thoiGianCap.toDate())
                  .tz('Asia/Ho_Chi_Minh')
                  .format('HH:mm - DD/MM/YYYY')}
              </span>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className=''>
              <span className='mr-4 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Địa chỉ Email:
              </span>
              <span className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
                {progression?.email}
              </span>
            </div>
          </Col>
          <Col span={12} xs={24} xl={12}>
            <div className=''>
              <span className='mr-5 font-semibold text-base leading-6 text-primary-gray-500 w-[100px]'>
                Hạn sử dụng:
              </span>
              <span className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
                {moment(progression?.hanSuDung.toDate())
                  .tz('Asia/Ho_Chi_Minh')
                  .format('HH:mm - DD/MM/YYYY')}
              </span>
            </div>
          </Col>
        </Row>
        {/* Updated Device button */}
        <Link
          to='/progression-management/'
          className='absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary'
        >
          <div className='w-5 h-5'>
            <img src='/images/svgs/back-square.svg' alt='' />
          </div>
          <span className='text-sm'>Quay lại</span>
        </Link>
      </div>
    </div>
  );
};

export default DetailProgression;
