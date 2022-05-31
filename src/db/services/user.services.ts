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
  addUser = async (
    tenDangNhap: string,
    hoTen: string,
    soDienThoai: string,
    email: string,
    matKhau: string,
    vaiTro: string,
    trangThai: boolean,
  ) => {
    await setDoc(doc(collection(db, 'user')), {
      tenDangNhap: tenDangNhap,
      hoTen: hoTen,
      soDienThoai: soDienThoai,
      email: email,
      matKhau: matKhau,
      vaiTro: vaiTro,
      trangThai: trangThai,
    });
  };

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
