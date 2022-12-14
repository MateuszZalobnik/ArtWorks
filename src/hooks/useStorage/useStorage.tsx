import { useState } from 'react';
import { storage } from 'firabase-config';
import { ref, deleteObject } from 'firebase/storage';
import useFirestore from 'hooks/useFirestore/useFirestore';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { DocumentReference } from 'firebase/firestore';
import { changeProfilePhoto, setSpinner } from 'store/actions/actions';
import { useDispatch } from 'react-redux';

const useStorage = () => {
  const [storageLoading, setStorageLoading] = useState(false);
  const { updateDocument } = useFirestore();

  const dispatch = useDispatch();

  const deleteFile = async (path: string) => {
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
  };

  const uploadFile = async (
    path: string,
    fileUploaded: any,
    DocRef: DocumentReference,
    key: string | null = null
  ) => {
    const fileRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(fileRef, fileUploaded);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        dispatch(setSpinner(true));
        setStorageLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      () => {
        setStorageLoading(false);
        alert('Nie udało się przesłać pliku');
      },
      () => {
        if (key) {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            updateDocument(DocRef, {
              [key]: url,
            }).then(() => {
              setStorageLoading(false);
              dispatch(setSpinner(false));
              if (key == 'profileImgUrl') {
                dispatch(changeProfilePhoto(url));
              }
            });
          });
        } else {
          setStorageLoading(false);
          dispatch(setSpinner(false));
        }
      }
    );
  };

  return { deleteFile, uploadFile, storageLoading, setStorageLoading };
};

export default useStorage;
