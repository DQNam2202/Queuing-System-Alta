import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import firebase from '../firebase';
import IDevice from '../types/device.type';

const db = firebase;

class DeviceServices {
  // TODO: Add device to the database
  adđevice = async (device: IDevice) => {
    await setDoc(doc(collection(db, 'device')), device);
  };
  // TODO: Get device to the database
  getDevice = async () => {
    let deviceList: IDevice[] = [];
    const querySnapshot = await getDocs(collection(db, 'device'));
    querySnapshot.forEach(doc => {
      let device: IDevice = {
        id: doc.id,
        tenDangNhap: doc.data().tenDangNhap,
        maThietBi: doc.data().maThietBi,
        tenThietBi: doc.data().tenThietBi,
        ip: doc.data().ip,
        trangThaiHoatDong: doc.data().trangThaiHoatDong,
        trangThaiKetNoi: doc.data().trangThaiKetNoi,
        matKhau: doc.data().matKhau,
        dichVuSuDung: doc.data().dichVuSuDung,
        loaiThietBi: doc.data().loaiThietBi,
      };
      deviceList.push(device);
    });
    return deviceList;
  };
  //TODO: Update device to the database
  updateDevice = async (device: IDevice) => {
    const refDevice = await doc(collection(db, 'device'), device.id);
    let diviceClone = { ...device };
    delete diviceClone.id;
    const updateDevice = await updateDoc(refDevice, {
      ...diviceClone,
    });
    return updateDevice;
  };
}
export default new DeviceServices();
