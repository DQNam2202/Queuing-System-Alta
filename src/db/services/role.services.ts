import {
  doc,
  updateDoc,
  setDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import firebase from '../firebase';
import IRole from '../types/role.type';

const db = firebase;

class RoleServices {
  addRole = async (tenVaiTro: string, moTa: string) => {
    await setDoc(doc(collection(db, 'role')), {
      tenVaiTro: tenVaiTro,
      moTa: moTa,
    });
  };

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

  updateRole = async (id: string, tenVaiTro: string, moTa: string) => {
    const frankDocRef = doc(collection(db, 'role'), id);
    await updateDoc(frankDocRef, {
      tenVaiTro: tenVaiTro,
      moTa: moTa,
    });
  };
}
export default new RoleServices();
