import { useContext, useState } from 'react';
import { doc, getDoc, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from 'firabase-config';
import { AuthContext } from 'context/AuthContext/AuthContext';

const useFirestore = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const [loading, setloading] = useState(true);
  const {
    state: { currentUser },
  } = useContext(AuthContext);

  const userDocRef = doc(db, 'users', currentUser);

  const getData = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      onSnapshot(userDocRef, async (doc) => {
        setUserData(docSnap.data(doc.data()));
        setloading(false);
      });
    } catch (err) {
      console.log('error');
    }
  };

  return { getData, userData, loading, userDocRef };
};

export default useFirestore;
