import { useState } from 'react';
import { storage } from 'firabase-config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const useStorage = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const deleteFile = async (path: string) => {
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
  };

  const uploadFile = async (path: string, fileUploaded: any) => {
    const imageRef = ref(storage, path);
    uploadBytes(imageRef, fileUploaded).then(async () => {
      getDownloadURL(imageRef).then((url) => {
        setCurrentUrl(url);
      });
    });
  };

  return { deleteFile, uploadFile, currentUrl };
};

export default useStorage;
