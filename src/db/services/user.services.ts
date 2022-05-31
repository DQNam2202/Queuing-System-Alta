import {
  doc,
  updateDoc,
  setDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import firebase from '../firebase';
import IUser from '../types/role.type';

const db = firebase;

class UserServices {
  // addUser = async (tenVaiTro: string, moTa: string) => {
  //   await setDoc(doc(collection(db, 'user')), {
  //     tenVaiTro: tenVaiTro,
  //     moTa: moTa,
  //   });
  // };

  getUser = async () => {
    let userList: IUser[] = [];
    const querySnapshot = await getDocs(collection(db, 'user'));
    querySnapshot.forEach(doc => {
      let user: any = {
        id: doc.id,
        tenDangNhap: doc.data().tenDangNhap,
        hoTen: doc.data().hoTen,
        soDienThoai: doc.data().soDienThoai,
        email: doc.data().email,
        matKhau: doc.data().matKhau,
        vaiTro: doc.data().vaiTro,
        trangThai: doc.data().trangThai,
      };
      userList.push(user);
    });
    return userList;
  };

  // updateUser = async (id: string, tenVaiTro: string, moTa: string) => {
  //   const frankDocRef = doc(collection(db, 'user'), id);
  //   await updateDoc(frankDocRef, {
  //     tenVaiTro: tenVaiTro,
  //     moTa: moTa,
  //   });
  // };
}
export default new UserServices();
