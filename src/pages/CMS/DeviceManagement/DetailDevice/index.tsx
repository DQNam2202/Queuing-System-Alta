import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeviceServices from '../../../../db/services/device.services';
import ServiceServices from '../../../../db/services/service.services';
const DetailDevice = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [device, setDevice] = React.useState<any>();

  useEffect(() => {
    (async () => {
      let data = await DeviceServices.getDevice();
      let services = await ServiceServices.getService();
      // Set lại data
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
      let index = data.findIndex(item => item.id === id);
      if (index !== -1) {
        setDevice(data[index]);
      } else {
        history('/device-management');
      }
    })();
  }, []);
  console.log(device);
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 relative'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Thiết bị &gt; Danh sách thiết bị &gt;{' '}
        <span className='text-primary font-bold'>Chi tiết thiết bị</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Quản lý thiết bị</h2>
      <div className='lg:flex lg:flex-col relative w-full h-full py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)] bg-white'>
        <h3 className='text-primary text-lg font-bold mb-5'>
          Thông tin thiết bị
        </h3>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[52px] font-semibold text-base leading-6 text-primary-gray-500'>
                Mã thiết bị:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.maThietBi}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[70px] font-semibold text-base leading-6 text-primary-gray-500'>
                Loại thiết bị:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.loaiThietBi}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-12 font-semibold text-base leading-6 text-primary-gray-500'>
                Tên thiết bị:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.tenThietBi}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-12 font-semibold text-base leading-6 text-primary-gray-500'>
                Tên đăng nhập:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.tenDangNhap}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[60px] font-semibold text-base leading-6 text-primary-gray-500'>
                Địa chỉ IP:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.ip}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[88px] font-semibold text-base leading-6 text-primary-gray-500'>
                Mật khẩu:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {device?.matKhau}
              </p>
            </div>
          </Col>
          <Col span={24}>
            <div className=''>
              <span className='font-semibold text-base leading-6 text-primary-gray-500'>
                Dịch vụ sử dụng:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
                {device?.dichVuSuDung.join(', ')}
              </p>
            </div>
          </Col>
        </Row>
        {/* Updated Device button */}
        <Link
          to='/devices-management/update/:id'
          className='lg:relative lg:w-full lg:mt-5 lg:top-auto lg:right-auto absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary font-bold cursor-pointer hover:text-primary shadow-[0px_0px_6px_rgba(231, 233, 242, 0.8)] rounded-tl-lg'
        >
          <div className='flex justify-center items-center w-[23px] h-[23px]'>
            <i className='fa fa-pen bg-primary-400 text-white rounded w-full h-full'></i>
          </div>
          <span className='text-sm'>Cập nhật thiết bị</span>
        </Link>
      </div>
    </div>
  );
};

export default DetailDevice;
