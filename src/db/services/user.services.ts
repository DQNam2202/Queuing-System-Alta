import {
  doc,
  updateDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
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
    avatar: string,
  ) => {
    await setDoc(doc(collection(db, 'user')), {
      tenDangNhap: tenDangNhap,
      hoTen: hoTen,
      soDienThoai: soDienThoai,
      email: email,
      matKhau: matKhau,
      vaiTro: vaiTro,
      trangThai: trangThai,
      avatar: avatar,
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
        avatar: doc.data().avatar,
      };
      userList.push(user);
    });
    return userList;
  };

  updateUser = async (
    id: string,
    tenDangNhap: string,
    hoTen: string,
    soDienThoai: string,
    email: string,
    matKhau: string,
    vaiTro: string,
    trangThai: boolean,
  ) => {
    const frankDocRef = doc(collection(db, 'user'), id);
    await updateDoc(frankDocRef, {
      tenDangNhap: tenDangNhap,
      hoTen: hoTen,
      soDienThoai: soDienThoai,
      email: email,
      matKhau: matKhau,
      vaiTro: vaiTro,
      trangThai: trangThai,
    });
  };

  login = async (tenDangNhap: string, matKhau: string) => {
    const q = query(
      collection(db, 'user'),
      where('tenDangNhap', '==', tenDangNhap),
      where('matKhau', '==', matKhau),
    );
    const querySnapshot = await getDocs(q);
    let temp = null;
    querySnapshot.forEach(doc => {
      temp = {
        ...doc.data(),
        id: doc.id,
      };
    });
    return temp;
  };
}
export default new UserServices();
