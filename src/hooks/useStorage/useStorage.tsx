import { useState } from 'react';
import { storage } from 'firabase-config';
import { ref, deleteObject } from 'firebase/storage';
import useFirestore from 'hooks/useFirestore/useFirestore';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useStorage = () => {
  const [storageLoading, setStorageLoading] = useState(false);
  const { userDocRef, updateDocument } = useFirestore();

  const deleteFile = async (path: string) => {
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
    updateDocument(userDocRef, {
      profileImgPath: '',
    });
  };

  const uploadFile = async (path: string, fileUploaded: any) => {
    const fileRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(fileRef, fileUploaded);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
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
        updateDocument(userDocRef, {
          profileImgPath: path,
        });
        getDownloadURL(uploadTask.snapshot.ref).then(() => {
          setStorageLoading(false);
        });
      }
    );
  };

  return { deleteFile, uploadFile, storageLoading, setStorageLoading };
};

export default useStorage;
