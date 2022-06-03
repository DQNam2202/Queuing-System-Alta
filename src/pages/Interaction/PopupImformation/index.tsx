import React, { useState, MouseEventHandler } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import './style.scss';
import PopupNumberPrint from '../../Interaction/PopupNumberPrint';
import IService from '../../../db/types/service.type';
import IProgression, {
  Source,
  Status,
} from '../../../db/types/progression.type';
import LogServices from '../../../db/services/log_system.services';
import ProgressionServices from '../../../db/services/progression.services';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/user/userSlice';
import { getID } from '../../../APIs/getIP';

type Props = {
  showModal: MouseEventHandler;
  handleOk: MouseEventHandler;
  handleCancel: MouseEventHandler;
  isModalVisible: boolean;
  service: IService;
};
const FillImformation = (props: Props) => {
  const { showModal, handleCancel, isModalVisible, service } = props;
  const [info, setInfo] = useState(null);
  const [result, setResult] = useState(null);
  const me = useAppSelector(selectUser);

  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const handleOk = (e: any) => {
    e.preventDefault();
  };

  const handleCancel1 = (e: any) => {
    e.preventDefault();
    setIsModalVisible1(false);
  };

  function pad_with_zeroes(number: Number, length: Number) {
    var my_string = '' + number;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }
    return my_string;
  }

  const handleFinish = async (values: any) => {
    setInfo({
      service,
      ...values,
    });
    //Thêm cấp số
    let hsd = new Date();
    hsd.setDate(hsd.getDate() + 1);

    let data = await ProgressionServices.getProgression();
    //Tăng stt tự động
    let dataFilter = data.filter(item => item.dichVu === service.id);
    let dataSort: IProgression[] = dataFilter.sort(
      (a: IProgression, b: IProgression) => {
        let numberA = parseInt(a.stt.substring(3));
        let numberB = parseInt(b.stt.substring(3));
        return numberA - numberB;
      },
    );
    // Last stt
    let lastNumber;
    if (dataSort[dataSort.length - 1]) {
      lastNumber = parseInt(
        { ...dataSort[dataSort.length - 1] }.stt.substring(3),
      );
    } else {
      lastNumber = 0;
    }

    let progress: any = {
      dichVu: service.id,
      email: values.email,
      hanSuDung: hsd,
      hoTen: values.hoTen,
      nguonCap: Source.SYSTEM,
      soDienThoai: values.soDienThoai,
      stt: service.maDichVu + pad_with_zeroes(lastNumber + 1, 4),
      thoiGianCap: new Date(),
      trangThai: Status.PENDING,
    };

    await ProgressionServices.addProgression(progress);
    // Thêm log
    //Add user log
    let ipv4 = await getID();
    LogServices.addLog({
      tenDangNhap: me ? me.tenDangNhap : 'Unknown',
      actionTime: new Date(),
      ip: ipv4.IPv4,
      action: `Cấp số mới ${progress.stt}`,
    });
    setResult({ ...progress, tenDichVu: service.tenDichVu });
    setIsModalVisible1(true);
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
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
                <Form className='w-full' onFinish={handleFinish}>
                  <div className=''>
                    <Form.Item
                      label='Họ tên'
                      name={'hoTen'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập họ tên',
                        },
                      ]}
                    >
                      <Input
                        className='w-full h-11 '
                        placeholder='Nhập họ và tên của bạn'
                      />
                    </Form.Item>
                  </div>
                  <div className='mt-4'>
                    <Form.Item
                      label='Số điện thoại'
                      name={'soDienThoai'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại',
                        },
                        {
                          pattern: new RegExp(
                            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                          ),
                          message: 'Số điện thoại không đúng định dạng!',
                        },
                      ]}
                    >
                      <Input
                        className='w-full h-11'
                        placeholder='Nhập số điện thoại của bạn'
                      />
                    </Form.Item>
                  </div>
                  <div className='mt-4 mb-[10px]'>
                    <Form.Item
                      label='Email'
                      name={'email'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng email',
                        },
                        {
                          type: 'email',
                          message: 'Email không đúng định dạng',
                        },
                      ]}
                    >
                      <Input
                        className='w-full h-11 '
                        placeholder='Nhập email của bạn'
                      />
                    </Form.Item>
                  </div>
                  <span className='text-sm font-normal leading-5'>
                    <strong className='text-[#FF4747]'>* </strong>
                    Là trường thông tin bắt buộc
                  </span>
                  <div className='flex justify-center items-center mt-[49px] gap-x-[33px]'>
                    <Button
                      className='btn-primary btn-outline btn-cancel'
                      onClick={handleCancel}
                    >
                      Hủy bỏ
                    </Button>
                    <Button htmlType='submit' className='btn-primary'>
                      Xác nhận
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {result && (
        <PopupNumberPrint
          result={result}
          handleCancel={handleCancel1}
          handleOk={handleOk}
          isModalVisible={isModalVisible1}
        ></PopupNumberPrint>
      )}
      ;
    </div>
  );
};

export default FillImformation;
