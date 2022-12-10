import { useContext, useState } from 'react';
import {
  doc,
  getDoc,
  DocumentData,
  onSnapshot,
  updateDoc,
  DocumentReference,
  getDocs,
  collection,
  query,
  where,
  WhereFilterOp,
  deleteDoc,
} from 'firebase/firestore';
import { db } from 'firabase-config';
import { AuthContext } from 'context/AuthContext/AuthContext';

const useFirestore = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const {
    state: { uid },
  } = useContext(AuthContext);

  const userDocRef = doc(db, 'users', uid);

  const getDocument = async (DocRef: DocumentReference<DocumentData>) => {
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
    value: object
  ) => {
    try {
      await updateDoc(DocRef, value);
      setFirestoreLoading(true);
    } catch (err) {
      console.log('error');
    }
  };

  const getAllCollection = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setFirestoreLoading(false);
    return querySnapshot;
  };

  const getQueryCollection = async (
    collectionName: string,
    fieldName: string,
    operator: WhereFilterOp,
    fieldValue: string
  ) => {
    const q = query(
      collection(db, collectionName),
      where(fieldName, operator, fieldValue)
    );
    const querySnapshot = getDocs(q);
    return querySnapshot;
  };

  const DeleteDocument = async (collectionName: string, docName: string) => {
    await deleteDoc(doc(db, collectionName, docName));
  };

  return {
    getDocument,
    userData,
    firestoreLoading,
    setFirestoreLoading,
    userDocRef,
    updateDocument,
    getAllCollection,
    getQueryCollection,
    DeleteDocument,
  };
};

export default useFirestore;
