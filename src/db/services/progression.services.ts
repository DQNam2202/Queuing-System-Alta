import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import firebase from '../firebase';
import IProgression from '../types/progession.type';

const db = firebase;

class ProgressionServices {
  addProgression = async (progression: IProgression) => {
    await setDoc(doc(collection(db, 'progression')), progression);
  };

  getProgression = async () => {
    let progressList: IProgression[] = [];
    const querySnapshot = await getDocs(collection(db, 'progression'));
    querySnapshot.forEach(doc => {
      let progression: IProgression = {
        id: doc.id,
        stt: doc.data().stt,
        hoTen: doc.data().hoTen,
        soDienThoai: doc.data().soDienThoai,
        email: doc.data().email,
        dichVu: doc.data().dichVu,
        thoiGianCap: doc.data().thoiGianCap,
        hanSuDung: doc.data().hanSuDung,
        trangThai: doc.data().trangThai,
        nguonCap: doc.data().nguonCap,
        tenDichVu: doc.data().tenDichVu,
      };
      progressList.push(progression);
    });
    return progressList;
  };
}
export default new ProgressionServices();
