// USER MODEL
/** Schema --->
 * tenDangNhap: String (key)
	hoTen: String
	soDienThoai: String VietNamese Phone
	email: Email (unique)
  matKhau: String
	vaiTro: id reference from Role
	trangThai: Boolean
 */
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  getDocs,
  collection,
} from 'firebase/firestore';
import firebase from '../firebase';
import IRole from '../types/role.type';

const db = firebase;

class RoleServices {
  // addNewUser = async (user: IRole) => {
  //   let document = doc(db, 'user', user.tenDangNhap);
  //   let temp = { ...user };
  //   updateDoc(document, {
  //     ...temp,
  //   });
  // };

  getRole = async () => {
    let role: IRole[] = [];
    const querySnapshot = await getDocs(collection(db, 'role'));
    querySnapshot.forEach(doc => {
      let vaiTro: any = {
        id: doc.id,
        tenVaiTro: doc.data().tenVaiTro,
        moTa: doc.data().moTa,
      };
      role.push(vaiTro);
    });
    return role;
  };

  // updateUser = async (user: IUser) => {
  //   let document = doc(db, 'user', user.tenDangNhap);
  //   updateDoc(document, {
  //     ...user,
  //   });
  // };
}
export default new RoleServices();
