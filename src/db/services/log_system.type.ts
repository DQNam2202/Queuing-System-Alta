import {
  doc,
  // updateDoc,
  setDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import firebase from '../firebase';
import ILog from '../types/role.type';

const db = firebase;

class SystemLogServices {
  addLog = async (
    tenDangNhap: string,
    actionTime: Date,
    ip: string,
    action: string,
  ) => {
    await setDoc(doc(collection(db, 'activity-log')), {
      tenDangNhap: tenDangNhap,
      actionTime: actionTime,
      ip: ip,
      action: action,
    });
  };

  getSystemLog = async () => {
    let activityLog: ILog[] = [];
    const querySnapshot = await getDocs(collection(db, 'activity-log'));
    querySnapshot.forEach(doc => {
      let activity: any = {
        tenDangNhap: doc.data().tenDangNhap,
        actionTime: doc.data().actionTime,
        ip: doc.data().ip,
        action: doc.data().action,
      };
      activityLog.push(activity);
    });
    return activityLog;
  };
}
export default new SystemLogServices();
