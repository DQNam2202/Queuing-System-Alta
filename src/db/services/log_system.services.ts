import {
  doc,
  // updateDoc,
  setDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import firebase from '../firebase';
import ILog from '../types/log_system.type';

const db = firebase;

class SystemLogServices {
  addLog = async (log: ILog) => {
    await setDoc(doc(collection(db, 'activity-log')), log);
  };

  getSystemLog = async () => {
    let activityLog: ILog[] = [];
    const querySnapshot = await getDocs(collection(db, 'activity-log'));
    querySnapshot.forEach(doc => {
      let activity: any = {
        id: doc.id,
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
