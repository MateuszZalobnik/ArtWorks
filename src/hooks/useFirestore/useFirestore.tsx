import { useContext, useState } from 'react';
import {
  doc,
  getDoc,
  DocumentData,
  onSnapshot,
  updateDoc,
  DocumentReference,
} from 'firebase/firestore';
import { db } from 'firabase-config';
import { AuthContext } from 'context/AuthContext/AuthContext';

const useFirestore = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const {
    state: { currentUser },
  } = useContext(AuthContext);

  const userDocRef = doc(db, 'users', currentUser);

  const getData = async (DocRef: DocumentReference<DocumentData>) => {
    try {
      const docSnap = await getDoc(DocRef);
      onSnapshot(DocRef, async (doc) => {
        setUserData(docSnap.data(doc.data()));
        setFirestoreLoading(false);
      });
    } catch (err) {
      console.log('error');
    }
  };

  const updateDocument = async (
    DocRef: DocumentReference<DocumentData>,
    values: object
  ) => {
    try {
      await updateDoc(DocRef, values);
      setFirestoreLoading(true);
    } catch (err) {
      console.log('error');
    }
  };

  return {
    getData,
    userData,
    firestoreLoading,
    setFirestoreLoading,
    userDocRef,
    updateDocument,
  };
};

export default useFirestore;
