import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import firebase from '../firebase';
import IService from '../types/service.type';

const db = firebase;

class ServiceServices {
  // Add Service
  addService = async (service: IService) => {
    await setDoc(doc(collection(db, 'service')), service);
  };

  getService = async () => {
    let serviceList: IService[] = [];
    const querySnapshot = await getDocs(collection(db, 'service'));
    querySnapshot.forEach(doc => {
      let item: IService = {
        id: doc.id,
        maDichVu: doc.data().maDichVu,
        moTa: doc.data().moTa,
        tenDichVu: doc.data().tenDichVu,
        prefix: doc.data().prefix,
        surfix: doc.data().surfix,
        autoIncrease: doc.data().autoIncrease,
        reset: doc.data().reset,
        trangThai: doc.data().trangThai,
      };
      serviceList.push(item);
    });
    return serviceList;
  };

  // Updated Service
  updateService = async (service: IService) => {
    const docRef = doc(collection(db, 'service'), service.id);
    let temp = { ...service };
    delete temp.id;
    const updated = await updateDoc(docRef, {
      ...temp,
    });
    return updated;
  };
}
export default new ServiceServices();
