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
import { doc,updateDoc,arrayUnion,getDoc,deleteDoc,setDoc,onSnapshot } from "firebase/firestore";
import firebase from "../firebase";
import IUser from "../types/user.type";

const db = firebase

class UserServices{
  addNewUser = async (user: IUser) => {
    let document = doc(db, "user", user.tenDangNhap);
    let temp = {...user}
    updateDoc(document, {
      ...temp
    });
  };
  
  getUser = async (tenDangNhap:string) => {
    let document = doc(db, "user");
    onSnapshot(document, (snapshot : any) => {
      if (snapshot.exists) {
        return snapshot.data();
      }
    });
  };
   updateUser = async (user: IUser) => {
    let document = doc(db, "user", user.tenDangNhap);
    updateDoc(document, {
      ...user
    });
  };
}
export default new UserServices()
