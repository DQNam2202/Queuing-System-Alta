import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { selectUser, updateUser } from '../../../features/user/userSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import RoleServices from '../../../db/services/role.services';
import { storage } from '../../../db/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firseabse from '../../../db/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './style.scss';
type LayoutType = Parameters<typeof Form>[0]['layout'];

const Profile = () => {
  const [form] = Form.useForm();
  const db = firseabse;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  useEffect(() => {
    RoleServices.getRole().then((res: any) => {
      form.setFieldsValue({
        hoTen: user?.hoTen,
        soDienThoai: user?.soDienThoai,
        email: user?.email,
        tenDangNhap: user?.tenDangNhap,
        matKhau: user?.matKhau,
        vaiTro:
          res[res.findIndex((item: any) => item.id === user?.vaiTro)]
            ?.tenVaiTro,
      });
    });
  }, [user]);
  console.log(user);

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const [singleImage, setSingleImage] = useState('') as any;

  // get image
  const handleImage = (e: any) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    let pickedFile;
    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      setSingleImage(pickedFile);
    }
  };

  // Upload images
  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleUpload = () => {
    if (singleImage === null) return;
    const storageRef = ref(storage, 'images/' + singleImage.name);
    const uploadTask = uploadBytesResumable(storageRef, singleImage, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
          if (user) {
            await updateDoc(doc(db, 'user', user.id), {
              avatar: downloadURL,
            });
            dispatch(
              updateUser({
                ...user,
                avatar: downloadURL,
              }),
            );
          }
        });
      },
    );
  };

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-[24px] relative profile'>
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
            <Col className='gutter-row' xs={24} sm={24} lg={8} md={24}>
              <div className='relative flex flex-col justify-center items-center'>
                <div className='lg:w-40 lg:h-40 w-[248px] h-[248px] text-center relative'>
                  <img
                    className='w-full h-full object-cover rounded-[318px]'
                    src={
                      user?.avatar === '' ? '/images/avatar.png' : user?.avatar
                    }
                    alt='avatar'
                  />
                  <input
                    className='absolute w-11 h-11 -bottom-2 left-3/4 -translate-x-3/4 bg-primary border-2 border-solid border-white flex justify-center items-center rounded-full cursor-pointer'
                    type='file'
                    onChange={handleImage}
                  />
                  {/* <Form.Item
                      name='upload'
                      valuePropName='fileList'
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name='logo'
                        listType='picture'
                        onChange={handleImage}
                      >

                      </Upload>
                    </Form.Item> */}
                  <Button
                    icon={<CameraOutlined />}
                    onClick={handleUpload}
                  ></Button>
                </div>
                <h2 className='mt-5 text-center text-2xl font-bold leading-9 text-primary-gray-500'>
                  {user?.hoTen}
                </h2>
              </div>
            </Col>
            <Col sm={24} lg={8} md={24}>
              <Form.Item
                label='Tên người dùng'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='hoTen'
              >
                <Input placeholder='username' disabled />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='soDienThoai'
              >
                <Input placeholder='0392680723' disabled />
              </Form.Item>
              <Form.Item
                label='Email'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='email'
              >
                <Input placeholder='example@gmail.com' disabled />
              </Form.Item>
            </Col>
            <Col sm={24} lg={8} md={24}>
              <Form.Item
                label='Tên đăng nhập'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='tenDangNhap'
              >
                <Input placeholder='lehuynhaivan2000' disabled />
              </Form.Item>
              <Form.Item
                label='Mật khẩu'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='matKhau'
              >
                <Input placeholder='huynhleaivan@123' disabled />
              </Form.Item>
              <Form.Item
                label='Vai trò'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='vaiTro'
              >
                <Input placeholder='Front-End Developer' disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
